# Configuración inicial — Dinero Futuro

Guía completa para pasar de cero a publicación automática diaria.

---

## 1. Variables de entorno (.env.local)

Copia `.env.local.example` a `.env.local` y rellena los valores:

```bash
cp .env.local.example .env.local
```

| Variable | Obligatoria | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | URL de tu dominio sin barra final (`https://tudominio.com`) |
| `NEXT_PUBLIC_SITE_NAME` | ✅ | Nombre del sitio (aparece en metadatos) |
| `ANTHROPIC_API_KEY` | ✅ para auto-publicar | Clave de API de Anthropic |
| `GOOGLE_SHEET_WEBHOOK_URL` | ❌ opcional | Webhook para guardar emails de suscriptores |

---

## 2. Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:3000
```

Para probar la generación de artículos en local:

```bash
ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-article.mjs
```

---

## 3. Subir a GitHub

```bash
git init
git add .
git commit -m "🚀 Dinero Futuro — primer commit"
git remote add origin https://github.com/TU_USUARIO/dinero-futuro.git
git push -u origin main
```

---

## 4. Secrets en GitHub

Ve a tu repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Crea estos dos secrets:

### `ANTHROPIC_API_KEY`
- Ve a [console.anthropic.com](https://console.anthropic.com)
- API Keys → Create Key
- Copia el valor (empieza por `sk-ant-...`)

### `GH_TOKEN`
Un Personal Access Token con permiso para hacer push al repo:

1. GitHub → **Settings** (tu perfil) → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)** → **Generate new token**
3. Nombre: `DineroFuturo Bot`
4. Expiración: sin expiración (o la que prefieras)
5. Permisos: marca **solo `repo`** (acceso completo al repositorio)
6. Genera el token y **cópialo** — solo se muestra una vez
7. Pégalo como secret `GH_TOKEN` en GitHub

---

## 5. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Import tu repo de GitHub
3. Framework: **Next.js** (se detecta automáticamente)
4. Añade las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SITE_URL` → tu dominio final
   - `NEXT_PUBLIC_SITE_NAME` → Dinero Futuro
   - `ANTHROPIC_API_KEY` → (opcional aquí, solo se usa en el script)
   - `GOOGLE_SHEET_WEBHOOK_URL` → (si lo tienes)
5. **Deploy**

Cada push a `main` redespliega automáticamente.

---

## 6. Publicación automática diaria

El workflow `.github/workflows/publish.yml` se ejecuta cada día a las 07:00 UTC.

**Cómo funciona:**
1. GitHub clona el repo
2. Instala `@anthropic-ai/sdk` y `gray-matter`
3. Ejecuta `scripts/generate-article.mjs` que:
   - Lee los artículos existentes para no repetir temas
   - Calcula el siguiente nivel (rota 0→1→2→3→0) y categoría
   - Llama a Claude para generar el artículo completo
   - Guarda el archivo `.mdx`
   - Hace `git push origin main`
4. El push a main dispara el redeploy de Vercel automáticamente

**Para lanzarlo manualmente:**
GitHub → Actions → "Artículo diario" → **Run workflow**

**Para pausarlo:**
Comenta o elimina el bloque `schedule:` en `publish.yml`

---

## 7. Google Sheets — captura de emails

Para guardar los emails de suscriptores en una hoja de cálculo gratuita:

1. Crea una nueva hoja en [Google Sheets](https://sheets.google.com)
2. Añade cabeceras en la fila 1: `Email` | `Fecha`
3. **Extensiones** → **Apps Script** → borra el contenido y pega:

```javascript
function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    sheet.appendRow([data.email, new Date().toISOString()])
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
```

4. **Implementar** → **Nueva implementación**
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Copia la URL generada (`https://script.google.com/macros/s/.../exec`)
6. Pégala en `GOOGLE_SHEET_WEBHOOK_URL` (tanto en `.env.local` como en Vercel)

> ⚠️ Cada vez que modifiques el código del Apps Script debes crear una **nueva implementación** — no actualices la existente, o la URL cambiará.

---

## 8. Feed RSS

El feed RSS está disponible en `/feed.xml` (se genera dinámicamente).

Los suscriptores pueden añadirlo a cualquier lector RSS (Feedly, NetNewsWire, Reeder, etc.).

---

## 9. Estructura rápida de archivos clave

```
scripts/generate-article.mjs   ← script de auto-publicación
.github/workflows/publish.yml  ← cron diario 07:00 UTC
app/api/subscribe/route.ts     ← endpoint captura de emails
app/feed.xml/route.ts          ← feed RSS dinámico
content/articulos/             ← aquí viven los artículos .mdx
```

---

## 10. Añadir un artículo manualmente

```bash
# Crea el archivo con el frontmatter correcto
node scripts/generate-article.mjs
# El script llama a Claude y lo publica solo

# O créalo a mano:
# 1. Copia un .mdx existente de content/articulos/
# 2. Cambia el frontmatter (título, slug, fecha, etc.)
# 3. Escribe el contenido
# 4. git add + git commit + git push
```
