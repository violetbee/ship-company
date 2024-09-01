export function cleanHtmlContent(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Boş <p> etiketlerini kaldır
  doc.querySelectorAll("p").forEach((p) => {
    if (!p.textContent.trim()) {
      p.remove();
    }
  });

  // Diğer temizlik işlemleri
  doc.querySelectorAll("*").forEach((element) => {
    element.removeAttribute("style");
    element.removeAttribute("class");
  });

  return doc.body.innerHTML;
}
