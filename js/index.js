let turn=1;
let shipsPlaced=false;
let mhits=0;// manual hits
let chits=0;//computer hits

// ship factory function
const Ship=function(){
    sh={
        'coord':[],
        'length':0
    };
    const createShip=function(array){
        array.forEach(element => {
            sh['coord']=[...sh['coord'],element];
        });
        sh['length']=array.length;
    }

    const hit=function(id){
        this.sh['coord']=this.sh['coord'].filter((item)=>item!=id);

    }
    const isSunk=function(){
        if(sh['coord'].length==0)
        {
            return true;
        }
        else{
            return false;
        }
    }
    return {sh,createShip,hit,isSunk};
    
}





const Gameboard=function(){
    return {
        length:4,
        ships:[],
        receiveAttacks(x,y){
            let box=document.getElementById(`c${x}${y}`);
            console.log('hello there in receive attacks');

            if(box.getAttribute('status')=='filled')
            {
                window.alert('invalid move');
                return false;
            }
            else{
                if(box.getAttribute('shipPlaced')==='true')
                {
                    box.style.backgroundColor='green';
                    box.setAttribute('status','filled');
                    mhits+=1;
                    if(mhits==10)
                    {
                        window.alert('you win');
                        location.reload();
                        return false;
                    }
                    return true;
                }
                else{
                    box.style.backgroundColor='#ffaaee';
                    box.setAttribute('status','filled');
                }
            
            //box.setAttribute('shipPlaced','true');
            }  
            return true;          
        },
        
        findExisting(y){
            console.log(this.ships);
            for(let i=0;i<this.ships.length;i++)
            {
                for(let j=0;j<this.ships[i]['sh']['coord'].length;j++)
                {
                    if(this.ships[i]['sh']['coord'][j].y==y)
                    {
                        console.log('hello');
                        return true;
                    }
                }
            }
            return false;
            
        }
    }
    
    
        
    

    //return this,{receiveAttacks,findExisting};
}



// move that opposing plays
function computerMove(){
    
    while(true)
    {
        let x=Math.floor(Math.random()*10);
        let y=Math.floor(Math.random()*10);
        if(document.getElementById(`${x}${y}`).getAttribute('status')=='filled')
        {
            continue;
        }
        else{
            if(document.getElementById(`${x}${y}`).getAttribute('shipPlaced')=='true')
            {
                document.getElementById(`${x}${y}`).style.backgroundColor='green';
                document.getElementById(`${x}${y}`).setAttribute('status','filled');
                chits+=1;
                if(chits==10)
                {
                    window.alert('computer win');
                    location.reload();
                    return 
                }
                //return true;
            }
            else{
                document.getElementById(`${x}${y}`).style.backgroundColor='#ffaaee';
                document.getElementById(`${x}${y}`).setAttribute('status','filled');
                //return;
            }
            
            
            return;
        }
    }
    
}

    
    




const gameboard1=Gameboard();
const gameboard2=Gameboard();


// function for GRID_2
const computerGrid=function(){
    let ccontainer=document.createElement('div');
    ccontainer.setAttribute('id','ccontainer');
    document.body.appendChild(ccontainer);
    //console.log(document.getElementById('ccontainer'));
    ccontainer.setAttribute('style','width:40%;height:80%;')
    let w=ccontainer.offsetWidth;
    let h=ccontainer.offsetHeight;
   
    w=Number(w);
    h=Number(h);
    console.log(w,h);
    for(let i=0;i<10;i++)
    {
        for(let j=0;j<10;j++)
        {
            const box=document.createElement('div');
            box.setAttribute('class','box');
            box.setAttribute('id',`c${i}${j}`);
            box.setAttribute('status','vacant');
            box.setAttribute('shipPlaced','false');
            box.setAttribute('style',`width:${(Number(w)/10)}px;height:${(Number(h)/10)}px`);
            box.addEventListener('click',function(){
                
                if(gameboard2.receiveAttacks(i,j))
                {
                    turn++;
                    computerMove();
                    turn++;
                }
                
                
                
                
            });
            
            ccontainer.appendChild(box);
        }
    }
}


// function for GRID_1
const DOM=function(){
    //let w=screen.width;
    //let h=screen.height;
    let container=document.createElement('div');
    container.setAttribute('id','container');
    document.body.appendChild(container);
    //console.log(document.getElementById('container'));
    container.setAttribute('style','width:40%;height:80%;')
    let w=container.offsetWidth;
    let h=container.offsetHeight;
   
    w=Number(w);
    h=Number(h);
    console.log(w,h);
    for(let i=0;i<10;i++)
    {
        for(let j=0;j<10;j++)
        {
            const box=document.createElement('div');
            box.setAttribute('class','box');
            box.setAttribute('id',`${i}${j}`);
            box.setAttribute('status','vacant');
            box.setAttribute('shipPlaced','false');
            box.setAttribute('style',`width:${(Number(w)/10)}px;height:${(Number(h)/10)}px`);
            box.addEventListener('click',function(){
                
                placeShips(i,j);
            });
            
            container.appendChild(box);
        }
    }
   
}


//resizing the window
window.addEventListener('resize',function(){
    document.getElementById('container').innerHTML='';
    makegameboard1();
});


// when the page is initially loaded
window.addEventListener('load',function(){
    //DOM();
    
})

document.getElementById('next').addEventListener('click',function(){
    document.querySelector('.rules').style.display='none';
    makegameboard1();
})



// gameboard that has computer built ships and user plays here
function makegameboard2(){
    //let gameboard2=Gameboard();
    computerGrid(gameboard2);
    
    //computerGrid();
    let l=4;
    while(l!=0){
        
        let x1=Math.floor(Math.random()*6);

        let y1=Math.floor(Math.random()*10);
        while(gameboard2.findExisting(y1))
        {
            y1=Math.floor(Math.random()*10);
            console.log(y1);
        }
        //console.log(x1,y1);
        let ship=Ship();
        let array=[];
        for(let i=x1;i<=x1+l-1;i++)
        {
            array=[...array,{x:i,y:y1}];
            //console.log(document.getElementById(`c${i}${y1}`));
            document.getElementById(`c${i}${y1}`).style.backgroundColor='rgb(73, 205, 209)';
            document.getElementById(`c${i}${y1}`).setAttribute('shipPlaced','true');
        }
        ship.createShip(array);
        ship.sh['length']=l;
        l-=1;
        
        gameboard2.ships=[...gameboard2.ships,ship];
       
        
        
    }
    

}

//making Gameboard1
function makegameboard1(){
    //let gameboard1=Gameboard();
    DOM();
    
}



// called by placeShips deals with DOM manipulation to place ships 
function manMadeShips(x,y){
    let array=[];
    if(!gameboard1.findExisting(y)){
        for(let i=x;i<=x+gameboard1.length-1;i++)
        {
            array=[...array,{x:i,y:y}];
            document.getElementById(`${i}${y}`).style.backgroundColor='yellow';
            document.getElementById(`${i}${y}`).setAttribute('shipPlaced','true');
        }
        
        let ship=Ship();
        ship.createShip(array);
        gameboard1.ships=[...gameboard1.ships,ship];
        console.log(gameboard1.ships);
        gameboard1.length=gameboard1.length-1;
        console.log(gameboard1.length);
        if(gameboard1.length==0)
        {
            document.getElementById('container').style.pointerEvents='none';
            makegameboard2();
            
        }
        
    }
    else{
        window.alert('please place in another column')
    }
}

// a module to be called at initial state when user places ships
const placeShips=function(x,y){
    console.log(x,y);
    if(x+(gameboard1.length)-1<10){
        manMadeShips(x,y);

    }
    else{
        alert('not able to place here');
    }

}


    