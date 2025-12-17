(() => {
  const btn = document.getElementById("bigBtn");
  const status = document.getElementById("status");
  const output = document.getElementById("output");

  let timer = null;
  let startTime = null;
  let state = "idle"; // idle, waiting, ready, done

  function setState(newState) {
    state = newState;
    btn.classList.remove("waiting", "ready", "tooSoon");

    if (state === "idle") {
      btn.textContent = "START";
      status.textContent = "Click start and wait for green.";
    }

    if (state === "waiting") {
      btn.textContent = "WAIT...";
      btn.classList.add("waiting");
      status.textContent = "Do not click yet.";
    }

    if (state === "ready") {
      btn.textContent = "CLICK!";
      btn.classList.add("ready");
      status.textContent = "NOW!";
    }

    if (state === "done") {
      btn.textContent = "TRY AGAIN";
    }
  }

  btn.addEventListener("click", () => {
    if (state === "idle" || state === "done") {
      output.textContent = "—";
      setState("waiting");

      const delay = Math.random() * 2000 + 1000;

      timer = setTimeout(() => {
        startTime = performance.now();
        setState("ready");
      }, delay);
      return;
    }

    if (state === "waiting") {
      clearTimeout(timer);
      btn.classList.add("tooSoon");
      output.textContent = "FALSE START 💀";
      status.textContent = "Too soon!";
      setState("done");
      return;
    }

    if (state === "ready") {
      const reaction = Math.round(performance.now() - startTime);
      output.textContent = `${reaction} ms`;
      setState("done");
    }
  });

  setState("idle");
})();
