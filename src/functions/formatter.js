const URL_PATTERN = /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;

export function matchUrl(context) {
  return context.match(URL_PATTERN);
}

export function parseUrl(context, matched = null) {
  if (!matched) matched = matchUrl(context);
  if (!matched) return context;
  for (let m of matched) {
    if (m[m.length - 1] === ".") {
      m = m.slice(0, -1);
    }
    let r = new RegExp(`${m}`, "gim");
    context = context.replace(
      r,
      `<a href="${m}" class="text-decoration-underline" rel="noreferrer noopener" target="_blank">${m}</a>`
    );
  }
  return context;
}

export function parseTags(context, tags = []) {
  if (!tags) return context;
  for (let tag of tags) {
    let { name, offset, length } = tag;
    let prefix = context.slice(0, offset);
    let append = context.slice(offset + length);
    let replaceWith = ' <a href="#">' + name + "</a>";
    context = prefix + replaceWith + append;
  }
  return context;
}
