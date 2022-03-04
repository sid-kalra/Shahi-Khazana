if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}
else{
    ready();
}
function ready(){
    // Remove Items
    let remove=document.getElementsByClassName('Remove');
    for(let i=0;i<remove.length;i++){
        let removeElement=remove[i].firstElementChild;
        removeElement.addEventListener('click',removeElementNow);
    }
    // Total Price when Quantity change
    let ItemQuantity1=document.getElementsByClassName('ItemQuantity1');
    for(let i=0;i<ItemQuantity1.length;i++){
        ItemQuantity1[i].addEventListener('change',ItemQuantityChanged)
    }
    // Adding Items to Cart
    let add=document.getElementsByClassName('ItemName');
    for(let i=0;i<add.length;i++){
        let button=add[i].getElementsByTagName('button')[0];
        button.addEventListener
        ('click',AddToCart);
        button.addEventListener
        ('click',OrderButtonVisible);
    }
    //Clicking on gotocart
    let Orderbutton=document.getElementsByClassName('cartOrder')[0];
    Orderbutton.addEventListener('click',OrderButtonHidden);
    // Clicking on purchase button
    let Purchase=document.getElementsByClassName('Purchase')[0].getElementsByTagName('button')[0];
    Purchase.addEventListener('click',removeallItems);
}

function removeallItems(){
    let removeclass=document.getElementsByClassName('cartItem');
    // console.log(removeclass);
    for(let i=removeclass.length-1;i>=0;i--){
        removeclass[i].remove();
    }
    updateTotal();
    alert("Thank you for purchasing");
}

function OrderButtonHidden(){
    let styleEl1 = document.createElement('style');
    styleEl1.innerHTML = '.cartOrder{visibility:hidden;}';
    document.head.appendChild(styleEl1);
}


function OrderButtonVisible(){
    let styleEl = document.createElement('style');
    styleEl.innerHTML = '.cartOrder{visibility:visible;}';
    document.head.appendChild(styleEl);
}

function AddToCart(event){
    // console.log("HI");
    let button=event.target;
    let singlebox=button.parentElement.parentElement;
    // console.log(singlebox);
    let title=singlebox.getElementsByClassName('ItemName')[0].getElementsByTagName('h2')[0].innerText;
    let price=singlebox.getElementsByClassName('price')[0].innerText;
    let image=singlebox.getElementsByClassName('image-box')[0].getElementsByTagName('img')[0].src;

    let cartItem=document.getElementsByClassName('cartItem');
    // console.log(cartItem[0]);
    for(let i=0;i<cartItem.length;i++){
        let title1=cartItem[i].getElementsByClassName('ItemName1')[0].getElementsByTagName('p')[0].innerText;
        // console.log(title1);
        if(title1 ==title){
            alert('Already added to Cart');
            return;
        }
    }
    let num=0;
    for(let i=0;i<price.length;i++){
        let ans=false;
        if(!ans){
            let count=10;
            while(price[i]>=0 && price[i]<=9 && price[i]!=' '){
                // console.log(price[i],num);
                num=num*count+parseFloat(price[i]);
                i++;
            }
            ans=true;
        }
    }
    // console.log(price[4], num);
    addItem(title,num,image);
}


function addItem(title,price,image){
    let cartItem=document.createElement('div');
    let cartbox=document.getElementsByClassName('cartbox')[0];
    cartItemContent=`<div class="cartItem">
    <div class="ItemName1">
        <img src="${image}"> 
        <p>${title}</p>
    </div>
    <div class="ItemQuantity">
        <input class="ItemQuantity1" type="number" value="1">
    </div>
    <div class="ItemPrice">
        <p>Rs. ${price}</p>
    </div>
    <div class="ItemTotal">
        <p>Rs. ${price}</p>
    </div>
    <div class="Remove">
        <button><i class="fa-solid fa-trash"></i></button>
    </div>
    </div>`;
    cartItem.innerHTML=cartItemContent;
    cartbox.append(cartItem);
    let ItemQuantity1=document.getElementsByClassName('ItemQuantity1');
    let button=ItemQuantity1[ItemQuantity1.length-1].addEventListener('change',ItemQuantityChanged)
    let remove=document.getElementsByClassName('Remove');
    for(let i=0;i<remove.length;i++){
        let removeElement=remove[i].firstElementChild;
        removeElement.addEventListener('click',removeElementNow);
    }
    updateTotal();
}

function ItemQuantityChanged(event){
    let input=event.target;
    if(input.value==NaN || input.value<=0){
        input.value=1;
    }
    let ItemPrice=input.parentElement.parentElement.getElementsByClassName('ItemPrice')[0].innerText.replace('Rs. ','');
    let ItemTotal=input.parentElement.parentElement.getElementsByClassName('ItemTotal')[0];
    ItemTotal.innerText="Rs. "+((input.value)*(parseFloat(ItemPrice)));
    // console.log(input);
    updateTotal();
}
function removeElementNow(event){
    let button=event.path[3]
    button.remove();
    updateTotal();
}
function updateTotal(){
    let Total=0;
    let cartItem=document.getElementsByClassName('cartItem');
    for(let i=0;i<cartItem.length;i++){
        let ItemTotal=cartItem[i].getElementsByClassName('ItemTotal')[0].innerText.replace('Rs. ','');
        Total=Total+parseFloat(ItemTotal);
    }
    let Button=document.getElementsByClassName('TotalPrice')[0];
    Button.innerText="Total Rs. "+Total;
}