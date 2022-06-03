const shiftDrawing = (ref, x, y) => {
    const toMoveY = y < 0 ? 1000 + y : y
    const shiftY = 1000 - toMoveY
    
    const toMoveX = x < 0 ? 1000 + x : x
    const shiftX = 1000 - toMoveX
    
    const ctx = ref.current.getContext('2d')
    const newImg = new Image({width: 1000, height: 1000})
    newImg.src = ref.current.toDataURL()
    ctx.clearRect(0, 0, 1000, 1000)
    newImg.onload = function() {
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(newImg, shiftX, shiftY, toMoveX, toMoveY, 0, 0, toMoveX, toMoveY)
        ctx.drawImage(newImg, 0, shiftY, shiftX, toMoveY, toMoveX, 0, shiftX, toMoveY)
        ctx.drawImage(newImg, shiftX, 0, toMoveX, shiftY, 0, toMoveY, toMoveX, shiftY)
        ctx.drawImage(newImg, 0, 0, shiftX, shiftY, toMoveX, toMoveY, shiftX, shiftY)
    
    }  
  }

export default shiftDrawing