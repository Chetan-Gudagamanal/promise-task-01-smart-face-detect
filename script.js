
//Getting face-coordinates from claifai API
//API key is not disclosed here, It has been stored seperatly for security
const handleApiCall=(url)=>{
    const getData=async (url)=>{
        const apiUrl="https://smart-face-detect-server.herokuapp.com/image"
        let rawData=await fetch(apiUrl,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({imageUrl:url})
        });
        let jsonData=await rawData.json()
        .then(data=>detectFace(data))
        .catch(err=>console.log("Cant work with API"))
        
    }
    getData(url)
}


//onsubmit of inputUrl, handleSubmit function is called
let submit=document.querySelector(".submit-btn")
submit.addEventListener("click", (event)=>{

    let inputUrl=document.querySelector(".imgUrl").value
    let image=document.querySelector(".inputImage")
    image.setAttribute("src",inputUrl)
    handleApiCall(inputUrl)

    event.preventDefault();
})


//To highlight the face in the image
const detectFace=(data)=>{
    const faceData=data.outputs[0].data.regions[0].region_info.bounding_box
    console.log(faceData);
    
    displayFace(faceData)
    window.addEventListener("resize", ()=>{displayFace(faceData)});

}

function displayFace(faceData) {
    const image = document.querySelector(".inputImage")

    console.log(image.getAttribute("src"))
    const width = Number(image.width)
    const height = Number(image.height)

    console.log(height, width)
    let boxObj = {
        leftCol: faceData.left_col * width,
        topRow: faceData.top_row * height,
        rightCol: width - (faceData.right_col * width),
        bottomRow: height - (faceData.bottom_row * height)
    }
    console.log(boxObj.leftCol, boxObj.rightCol, boxObj.topRow, boxObj.bottomRow)
    const box = document.querySelector(".bounding-box")
    box.setAttribute("style", `left: ${boxObj.leftCol}px;right: ${boxObj.rightCol}px;top: ${boxObj.topRow}px;bottom: ${boxObj.bottomRow}px;`)
}

