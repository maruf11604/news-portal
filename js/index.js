const catagoriesLoader= async()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`;
    try {
      const res= await fetch(url);
      const data=await res.json();
      displayCatagories(data.data.news_category);
      
    } catch (error) {
      console.log(error);
    }

    
}

const displayCatagories=(catagories)=>{
    const catagoryContainer=document.getElementById('all-catagories');
    catagories.forEach(catagory => {
        console.log(catagory);

        const UL=document.createElement('ul');
        UL.classList.add('col')
        UL.innerHTML=`
        <li onclick="loadNewsId('${catagory.category_id}')" style="list-style-type:none" class="p-0 btn"><a>${catagory.category_name}</a></li>
        `;
        catagoryContainer.appendChild(UL);

    });

}


const loadNewsId= async(category_id)=>{
  toggleLoader(true)
  const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`;//cat-id

  try {
    const res =await fetch(url);
    const data= await res.json();
    DisplayId(data.data);//data.data
    
    
  } catch (error) {
    console.log(error);
  }

}
//display items

const DisplayId=(items)=>{
  
    items.sort(function(a,b){
      return b.total_view -a.total_view;
    })
    // console.log(items)
    
    const itemContainer=document.getElementById('catagories');
    itemContainer.innerHTML=''

    const noNews=document.getElementById('no-news');
    if(items.length===0){
      noNews.classList.remove('d-none')
    }
    else{
      noNews.classList.add('d-none')
    }
    items.forEach(item => {
      
        // console.log(item)
        const itemDiv=document.createElement('div');
        itemDiv.classList.add('col');
        itemDiv.innerHTML=`
        <div class="card mb-3" >
                <div class="row">
                  <div class="col-md-4 ">
                    <img src="${item.image_url?item.image_url:'no data found'}" class="img-fluid rounded-start" alt="...">
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
                        <img class="w-50 h-75 rounded-circle" src="${item.author.img}" alt="">
                      </div>
                      <div class="col-8">
                        <div><p>${item.author.name ? item.author.name : 'no data'}</p></div>
                        <p>${item.author.published_date ? item.author.published_date:'no data'}</p>
            
                      </div>
            
                    </div>
                    
                  </div>
                  <div class="col-6">
                    <span class="m-5">${item.total_view ? item.total_view :'no data ' }</span>
                    <span class="m-5">${item.rating.number}</span>
                    <button onclick="newsLoaderDetails('${item._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal" >show details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        `;
        itemContainer.appendChild(itemDiv);
        
    });
    toggleLoader(false);

      let length=items.length;
      const inputField=document.getElementById('item-id').innerText=length+" "+'items found for category Entertainment';
      
      

}
//news end




//spinner
const spinner=document.getElementById('loader');
const toggleLoader=isLoading=>{
      if(isLoading){
        spinner.classList.remove('d-none')
      }
      else{
        spinner.classList.add('d-none')
      }
}

const newsLoaderDetails=async(news_id)=>{
  const url=`https://openapi.programming-hero.com/api/news/${news_id}`;

  try {
    const res=await fetch(url);
    const data=await res.json();
    displayNewsDetails(data.data);
  } catch (error) {
    console.log(error)
  }
  
}

const displayNewsDetails=news=>{
  
  const modalTitle=document.getElementById('newsDetailModalLabel');
  const modalDetails=document.getElementById('news-details');
    news.forEach(element => {
      // console.log(element)
      modalTitle.innerText=element.title;
      modalDetails.innerHTML=`
      <p>${element.details}</p>
      <p>${element.author.name}</p>
      <p>${element.author.published_date}</p>
      
      `
    });
}



catagoriesLoader()