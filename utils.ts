export function parseChallenge(text: string, players: string[]) {
  return text
    .replace(/\$\(([0-9]+)\)/g, (c,n) => players[n-1])
    .replace(
      /\$\(([0-9]+)\+\)/g,
      (c,n) => {
        let out = players.slice(n-1);
        if (out.length >= 2)
          out.splice(-2, 2, `${out[out.length-2]} et ${out[out.length-1]}`);
        return out.join(", ");
      }
    );
}