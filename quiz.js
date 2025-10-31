// quiz.js

document.addEventListener("DOMContentLoaded", function () {

  // grab stuff from the page
  const form = document.getElementById("quizForm")
  const submitBtn = document.querySelector(".submit")
  const resetBtn = document.querySelector(".reset")

  //make a results box that shows up after user submit
  const resultsBox = document.createElement("section")
  resultsBox.id = "resultsBox"
  resultsBox.style.margin = "20px auto"
  resultsBox.style.maxWidth = "1200px"
  resultsBox.style.background = "#fff"
  resultsBox.style.padding = "16px"
  resultsBox.style.borderRadius = "8px"
  resultsBox.style.boxShadow = "0 2px 5px rgba(0,0,0,.05)"
  resultsBox.style.display = "none"
  resultsBox.innerHTML = `
    <h2 style="color:#8a4b2f;">quiz results</h2>
    <p id="overallResult"></p>
    <p id="totalScore"></p>
    <div id="questionFeedback"></div>
  `
  document.querySelector(".quiz-container").appendChild(resultsBox)
  //document.body.appendChild(resultsBox)

  // correct answers
  const answerKey = {
    q1: "mosaic",
    q2: ["B", "C"],
    q3: "Firefox",
    q4: "Microsoft",
    q5: "Http3"
  }

  // when submit clicked
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault()
    gradeQuiz()
  })

  // when reset clicked
  resetBtn.addEventListener("click", function () {
    setTimeout(() => {
      clearFeedback()
      resultsBox.style.display = "none"
    }, 0)
  })

  // grades everything
  function gradeQuiz() {
    let score = 0
    const maxScore = 5
    const feedback = []

    // q1 text
    const q1Val = document.getElementById("answer").value.trim().toLowerCase()
    if (q1Val === answerKey.q1) {
      score++
      feedback.push(makeFeedback(1, true, "mosaic"))
      colorQuestion("q1", true)
    } else {
      feedback.push(makeFeedback(1, false, "mosaic"))
      colorQuestion("q1", false)
    }

    // q2 checkboxes
    const q2Checked = Array.from(document.querySelectorAll('input[name="q2"]:checked')).map(e => e.value)
    const q2Correct = arraysEqual(q2Checked, answerKey.q2)
    if (q2Correct) {
      score++
      feedback.push(makeFeedback(2, true, "b and c"))
      colorQuestion("q2", true)
    } else {
      feedback.push(makeFeedback(2, false, "b and c"))
      colorQuestion("q2", false)
    }

    // q3 radios
    const q3Val = getSelected("q3")
    if (q3Val === answerKey.q3) {
      score++
      feedback.push(makeFeedback(3, true, "firefox"))
      colorQuestion("q3", true)
    } else {
      feedback.push(makeFeedback(3, false, "firefox"))
      colorQuestion("q3", false)
    }

    // q4 radios
    const q4Val = getSelected("q4")
    if (q4Val === answerKey.q4) {
      score++
      feedback.push(makeFeedback(4, true, "microsoft edge"))
      colorQuestion("q4", true)
    } else {
      feedback.push(makeFeedback(4, false, "microsoft edge"))
      colorQuestion("q4", false)
    }

    // q5 radios
    const q5Val = getSelected("q5")
    if (q5Val === answerKey.q5) {
      score++
      feedback.push(makeFeedback(5, true, "http-3.0"))
      colorQuestion("q5", true)
    } else {
      feedback.push(makeFeedback(5, false, "http-3.0"))
      colorQuestion("q5", false)
    }

    // show results
    resultsBox.style.display = "block"
    const passed = score >= 3
    document.getElementById("overallResult").textContent = passed ? "pass ✅" : "fail ❌"
    document.getElementById("overallResult").style.color = passed ? "green" : "red"
    document.getElementById("totalScore").textContent = `score: ${score} / ${maxScore}`
    document.getElementById("questionFeedback").innerHTML = feedback.join("")
  }

  // find which radio is picked
  function getSelected(name) {
    const items = document.querySelectorAll(`input[name="${name}"]`)
    for (let i of items) if (i.checked) return i.value
    return null
  }

  // check if arrays match
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false
    a = [...a].sort()
    b = [...b].sort()
    return a.every((v, i) => v === b[i])
  }

  // shows each question feedback
  function makeFeedback(num, correct, ans) {
    return `<p><strong>question ${num}:</strong> 
      <span style="color:${correct ? "green" : "red"}">${correct ? "correct" : "incorrect"}</span> 
      ${!correct ? "— correct: " + ans : ""}
    </p>`
  }

  // color question titles
  function colorQuestion(q, correct) {
    const h = document.getElementById(q)
    if (h) h.style.color = correct ? "green" : "red"
  }

  // reset colors after reset button
  function clearFeedback() {
    ["q1", "q2", "q3", "q4", "q5"].forEach(id => {
      const h = document.getElementById(id)
      if (h) h.style.color = "#8a4b2f"
    })
  }
})
