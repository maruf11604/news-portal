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
        <li onclick="loadNewsId('${catagory.category_id}')" style="list-style-type:none" class="p-1"><a>${catagory.category_name}</a></li>
        `;
        catagoryContainer.appendChild(UL);

    });

}

catagoriesLoader()