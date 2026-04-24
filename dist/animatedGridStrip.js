document.querySelectorAll(".animated_grid_wrapper").forEach((wrapper)=>{

    const rows = parseInt(wrapper.dataset.gridRows)||10
    const cols = parseInt(wrapper.dataset.gridCols)||10
    const activeColor = wrapper.dataset.gridColor||"#1e90ff"
    
    const stripeCount = parseInt(wrapper.dataset.stripeCount)||6
    const stripeColor = wrapper.dataset.stripeColor||"rgba(255,255,255,0.4)"
    const stripeWidth = parseInt(wrapper.dataset.stripeWidth)||2
    
    const totalCells = rows*cols
    
    wrapper.style.gridTemplateColumns = `repeat(${cols},1fr)`
    
    const cells=[]
    
    /* CREATE CELLS */
    for(let i=0;i<totalCells;i++){
      const cell=document.createElement("div")
      cell.classList.add("animated_grid")
      wrapper.appendChild(cell)
      cells.push(cell)
    }
    
    /* STRIPE GENERATOR */
    const createStripeBG = ()=>{
      const gap = 100 / stripeCount
    
      return `
        repeating-linear-gradient(
          45deg,
          ${stripeColor} 0px,
          ${stripeColor} ${stripeWidth}px,
          transparent ${stripeWidth}px,
          transparent ${gap}%
        )
      `
    }
    
    /* APPLY ::after BACKGROUND */
    const style = document.createElement("style")
    style.innerHTML = `
      .animated_grid::after{
        background: var(--stripe-bg);
      }
    `
    document.head.appendChild(style)
    
    /* GRID ANIMATION */
    let activeCells=[]
    
    const runGridAnimation=()=>{
    
      const shuffled = gsap.utils.shuffle([...cells])
    
      const newCells = shuffled.slice(0, Math.floor(totalCells*0.12))
    
      /* RESET OLD */
      activeCells.forEach(cell=>{
        cell.classList.remove("active")
      })
    
      gsap.to(activeCells,{
        backgroundColor:"transparent",
        boxShadow:"0 0 0px transparent",
        duration:.6
      })
    
      /* ACTIVATE NEW */
      newCells.forEach(cell=>{
        cell.classList.add("active")
        cell.style.setProperty("--stripe-bg", createStripeBG())
      })
    
      gsap.to(newCells,{
        backgroundColor:activeColor,
        boxShadow:`0 0 10px ${activeColor}`,
        duration:.6,
        stagger:{
          each:.02,
          from:"random"
        }
      })
    
      activeCells=newCells
    
      gsap.delayedCall(3, runGridAnimation)
    }
    
    /* START */
    runGridAnimation()
    
    })
    