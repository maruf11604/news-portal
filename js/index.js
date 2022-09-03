const catagoriesLoader= async()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`;

    const res= await fetch(url);
    const data=await res.json();
    displayCatagories(data.data.news_category);
}

const displayCatagories=(catagories)=>{
    const catagoryContainer=document.getElementById('all-catagories');
    catagories.forEach(catagory => {
        console.log(catagory);

        const UL=document.createElement('ul');
        UL.classList.add('col')
        UL.innerHTML=`
        <li onclick="loadNewsId('${catagory.category_id}')" style="list-style-type:none" class="p-1 btn"><a>${catagory.category_name}</a></li>
        `;
        catagoryContainer.appendChild(UL);

    });

}


const loadNewsId= async(category_id)=>{
    const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`;//cat-id

    const res =await fetch(url);
    const data= await res.json();
    DisplayId(data.data)//data.data

}

const DisplayId=(items)=>{
    
    const itemContainer=document.getElementById('catagories');
    itemContainer.innerHTML=''
    items.forEach(item => {
        console.log(item)
        const itemDiv=document.createElement('div');
        itemDiv.classList.add('col');
        itemDiv.innerHTML=`
        <div class="card mb-3" >
                <div class="row">
                  <div class="col-md-4 ">
                    <img src="${item.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8 ">

                    <div class="row">
                     <div class="card-body">
                      <h5 class="card-title">${item.title}</h5>
                      <p class="card-text">${item.details.slice(0,200)}...</p>
                     </div>
                    
                    </div>
                    <div class="row  ">
                    <div class="col-6">
                    <div class="row">
                      <div class="col-4 ">
                        <img class="w-50 h-75 rounded-circle" src="${item.image_url}" alt="">
                      </div>
                      <div class="col-8">
                        <div><p>${item.author.name}</p></div>
                        <p>${item.author.published_date}</p>
            
                      </div>
            
                    </div>
                    
                  </div>
                  <div class="col-6">
                    <span>${item.total_view}</span>
                    <span>
                    
                    </span>
                    <button class="ms-2" >btn</button>
                    
                    
                  </div>
                            
                        
                    
                    </div>
                  
                    
                    
                  </div>
                </div>
              </div>
        
        `;
        itemContainer.appendChild(itemDiv);
        
    });

}



catagoriesLoader()