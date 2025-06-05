document.addEventListener("DOMContentLoaded", () => {
  const poemForm = document.getElementById("poemForm");
  const poemInput = document.getElementById("poemTopic");
  const poemResult = document.getElementById("poemResult");

  poemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const topic = poemInput.value.trim();

    if (!topic) return;

    showLoadingState();

    setTimeout(() => {
      const mockPoem = generateMockPoem(topic);
      displayPoemWithEffect(mockPoem);
    }, 1500);
  });

  function showLoadingState() {
    poemResult.innerHTML = `
      <div class="loading">
        <span>Generating your poem...</span>
        <div class="spinner"></div>
      </div>
    `;
  }

  // Mock Poem Generator (Replace with API later)
  function generateMockPoem(topic) {
    const lines = [
      `About ${topic}, the words now flow,`,
      `Digital ink in a rhythmic glow.`,
      ``,
      `Through circuits and code so neat,`,
      `A poem emerges - yours to keep.`,
    ];
    return lines.join("\n");
  }

  function displayPoemWithEffect(text) {
    poemResult.innerHTML = "";
    let i = 0;
    const speed = 30;

    function type() {
      if (i < text.length) {
        if (text.charAt(i) === "\n") {
          poemResult.innerHTML += "<br>";
        } else {
          poemResult.innerHTML += text.charAt(i);
        }
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }
});
