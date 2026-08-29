const fs = require('fs');
const path = require('path');

async function build() {
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

  // Fetch articles from your Worker Admin API
  const res = await fetch('https://emdash-admin.beloachkokp.workers.dev/api/posts');
  const posts = await res.json();

  // Generate static index.html
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Public Site</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
    h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
    article { margin-bottom: 32px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
    h2 { margin-bottom: 8px; color: #0284c7; }
    .date { color: #64748b; font-size: 14px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <h1>Published Articles</h1>
  ${posts.map(p => `
    <article>
      <h2>${p.title}</h2>
      <div class="date">${new Date(p.created_at).toLocaleDateString()}</div>
      <div>${p.content}</div>
    </article>
  `).join('')}
</body>
</html>`;

  fs.writeFileSync(path.join(distDir, 'index.html'), html);
  console.log('Successfully generated pure static HTML into /dist');
}

build();
