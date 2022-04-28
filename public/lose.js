function getSolution(event) {
    let solutions = window.localStorage["solutions"];
    localStorage.removeItem("solutions")
    // let stringSolution = ""
    // for (answer of solutions) {
    //     stringSolution += answer
    // }
    // console.log(stringSolution)
    document.getElementById("solution").innerText = solutions;
    console.log("heihei");
}
document.getElementById("solution").addEventListener("mouseover", getSolution)