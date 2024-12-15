document.getElementById("generateForm").addEventListener("click", function () {
  const n = document.getElementById("n").value;
  const formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = "";

  for (let i = 0; i < n; i++) {
    const fieldSet = document.createElement("div");
    fieldSet.classList.add("field-set");

    fieldSet.innerHTML = `
            <label>Name 1:</label>
            <input type="text" name="name1-${i}" required>

            <label>Name 2:</label>
            <input type="text" name="name2-${i}" required>

            <label>Distance:</label>
            <input type="number" name="distance-${i}" min="1" required>

            <label>Direction:</label>
            <select name="direction-${i}" required>
                <option value="North">North</option>
                <option value="North-East">North-East</option>
                <option value="East">East</option>
                <option value="South-East">South-East</option>
                <option value="South">South</option>
                <option value="South-West">South-West</option>
                <option value="West">West</option>
                <option value="North-West">North-West</option>
            </select>
        `;

    formContainer.appendChild(fieldSet);
  }
});

function validateForm() {
  const formContainer = document.getElementById("formContainer");
  const inputs = formContainer.querySelectorAll("input, select");

  for (let input of inputs) {
    if (!input.checkValidity()) {
      alert("Please fill all fields correctly.");
      return false;
    }
  }
  generateResult();
  return false;
}

function generateResult() {
  const formContainer = document.getElementById("formContainer");
  const resultContainer = document.getElementById("resultContainer");
  const downloadBtn = document.getElementById("downloadBtn");

  const data = [];
  formContainer.querySelectorAll(".field-set").forEach((set, index) => {
    const name1 = set.querySelector(`input[name="name1-${index}"]`).value;
    const name2 = set.querySelector(`input[name="name2-${index}"]`).value;
    const distance = set.querySelector(`input[name="distance-${index}"]`).value;
    const direction = set.querySelector(
      `select[name="direction-${index}"]`
    ).value;

    data.push([name1, name2, distance, direction]);
  });

  if (data.length > 0) {
    const outputData = JSON.stringify(data, null, 2);
    resultContainer.innerHTML = `<pre>${outputData}</pre>`;
    downloadBtn.style.display = "inline-block";
    downloadBtn.dataset.fileContent = outputData;

    // Save the output file automatically
    saveOutputToFile(outputData);
  } else {
    resultContainer.innerHTML = "<p>No data to display.</p>";
    downloadBtn.style.display = "none";
  }
}

function saveOutputToFile(content) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "pipe_network_data.txt";
  link.click();
}

function resetForm() {
  document.getElementById("pipeForm").reset();
  document.getElementById("formContainer").innerHTML = "";
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("downloadBtn").style.display = "none";
}

/*function postData(input) {
    $.ajax({
        type: "POST",
        url: "/Prim.py",
        data: { param: input },
        success: callbackFunc
    });
}

function callbackFunc(response) {
    // do something with the response
    console.log(response);
}*/
