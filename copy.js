document.querySelectorAll("button.copy").forEach((button) => {
  const label = button.textContent;
  const say = (text) => {
    button.textContent = text;
    setTimeout(() => { button.textContent = label; }, 1800);
  };
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      say("Copied");
      return;
    } catch (e) {}
    const code = button.parentElement.querySelector("code");
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (e) {}
    say(copied ? "Copied" : "Press ⌘C");
  });
});
