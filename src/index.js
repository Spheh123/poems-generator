document.addEventListener("DOMContentLoaded", () => {
  const poemForm = document.getElementById("poemForm");
  const poemInput = document.getElementById("poemTopic");
  const poemResult = document.getElementById("poemResult");

  const API_KEY = "34a94d7b8cafc001064ocd5a14ctbaf4";
  const API_URL = "https://api.shecodes.io/ai/v1/generate";

  poemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const topic = poemInput.value.trim();

    if (!topic) return;

    showLoadingState(topic);

    try {
      const poem = await generatePoem(topic);
      displayPoemWithEffect(poem);
    } catch (error) {
      showErrorState();
      console.error("Poem generation failed:", error);
    }
  });

  function showLoadingState(topic) {
    poemResult.innerHTML = `
      <div class="loading">
        <span>Weaving verses about ${topic}...</span>
        <div class="spinner"></div>
      </div>
    `;
  }

  function showErrorState() {
    poemResult.innerHTML = `
      <div class="error">
        The muse is resting... Please try again shortly.
      </div>
    `;
  }

  async function generatePoem(topic) {
    const prompt = `Generate a beautiful 4-6 line poem about ${topic} with creative imagery and rhyme.`;
    const context =
      "Respond only with the poem text, no titles or explanations. Maintain line breaks.";

    const response = await fetch(
      `${API_URL}?prompt=${encodeURIComponent(
        prompt
      )}&context=${encodeURIComponent(context)}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.answer || "The poet's block struck... Try another topic.";
  }

  function displayPoemWithEffect(text) {
    poemResult.innerHTML = "";
    let i = 0;
    const speed = 20;

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
