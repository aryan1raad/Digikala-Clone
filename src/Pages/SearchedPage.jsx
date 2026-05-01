import { Link, useParams, useSearchParams } from "react-router-dom"
import { ProductContext } from "../App";
import { useContext, useEffect, useRef, useState } from "react";
import styles from '../assets/Styles/SearchedPage.module.css'
import PriceRange from "../Components/PriceRange";
//شوینگ آیتمز در کامپوننت های فرزند هم عوض خواهند شد ، در 
//PriceRange و ColorsRange
const SearchedPage = () => {
  const [maxPrice , setMaxPrice] = useState(0);
  const [minPrice , setMinPrice] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  const { items } = useContext(ProductContext);
  const [showingItems, setShowingItems] = useState([])
  const query = searchParams.get('q') || '';

  const filteredBeforeRangersRef = useRef(null);
  //ویو ، پرایس ، تخفیف
  const [sorter , setSorter] = useState(null);
  useEffect(() => {
    //اسکرول به  بالا برای دیدن صفحه بدون اسکرول قبلی
    window.scrollTo({top: 0});
  }, [])

  useEffect(() => {
    if(!items) return

    let filtered = items.slice();
    if (items && query !== null) {
      filtered = items.filter(itm =>
       itm.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log(query)
    }

    //فقط برای دسته بندی های کلیک شده ی تگ Link
    if(category){
      filtered = items.filter(itm => 
        itm.category === category
      )
    }

    if(sorter === 'price'){
      //کپی کردن آرایه بدون رفرنس
      for(let i = 0 ; i < filtered.length -1 ; i++){
        for (let j = 0; j < filtered.length -1 -i ; j++) {
          if(filtered[j].priceNumber > filtered[j+1].priceNumber)
            [filtered[j] , filtered[j+1]] = [filtered[j+1] , filtered[j]]
        }
      }
    } 
    else if(sorter === 'takhfif'){
      for(let i = 0 ; i < filtered.length -1 ; i++){
        for( let j = 0 ; j < filtered.length -1 -i ; j++){
          if (filtered[j].percent < filtered[j+1].percent)
            [filtered[j] , filtered[j+1]] = [filtered[j+1] , filtered[j]]
        }
      }
    }
    
    //اعمال تغییرات بالا
    filteredBeforeRangersRef.current = filtered;
    setShowingItems(filtered);

    if(filtered.length > 0 ){
      let min = filtered[0].priceNumber;
      let max = filtered[0].priceNumber;
      for (let i = 0; i < filtered.length; i++) {
        //پیدا کردن ماکسیمم و مینیمم
        if( filtered[i].priceNumber < min) 
          min = filtered[i].priceNumber;
        if( filtered[i].priceNumber > max) 
          max = filtered[i].priceNumber;
      }
      setMinPrice(min);
      setMaxPrice(max);
    }

  }, [items , query , category , sorter ])
  
  return (
    <div className={styles.Cont}>
      <div className={styles.InnerCont}>
        <div className={styles.innerFlex}>

          <section className={styles.LeftSec}>
            <div className={styles.sortingCont} dir="rtl">
              <div className={styles.sorting}>
                <div dir="rtl">مرتب سازی :</div>
                {/* <div onClick={() => setSorter('view')}>پربازدید ترین</div> */}
                <div onClick={() => setSorter('price')} style={sorter === 'price' ? {color: '#ef394e' , fontWeight: '700' , userSelect: 'none'} : { fontWeight: '700' , userSelect: 'none'}}>ارزان ترین</div>
                <div onClick={() => setSorter('takhfif')} style={sorter === 'takhfif' ? {color: '#ef394e' , fontWeight: '700' , userSelect: 'none'} : { fontWeight: '700' , userSelect: 'none'}}>بیشترین تخفیف</div>
              </div>

              <div style={{marginRight: 'auto'}}>
                {showingItems.length} کالا
              </div>
            </div>
            
            {/*جایی که محصولات سرچ شده ی ما نمایش داده خواهند شد*/}
            <div className={styles.ShowingGrid}>
              
              {/*مپ کردن محصولات سرچ شده */}
              {showingItems.map(prd => {
                return (
                  <div key={prd.id} className={styles.product_div}>
                    <Link to={`/product/${prd.id}`} className={styles.product_a}>
                      <div className={styles.product_inner}>
                        <article className={styles.article}>
                          <div className={styles.article_inner}>
                            <div></div>
                          </div>

                          <div style={{width: '100%'}}>
                            <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' , position: 'relative'}}>
                              <div dir="rtl" style={{marginLeft: 'auto' , marginRight: 'auto' , display: 'flex' }}>
                                <div className={styles.imgCont}>
                                  <img src={prd.img} alt={prd.title} />
                                </div>
                                <div className={styles.product_colors}>
                                  {prd.colors.map((color) => {
                                    if(color) return(
                                      <span className={styles.circleSpan} style={{width: '8px' , height: '8px' , borderRadius: '50%' , backgroundColor: `${color}`}}></span>
                                    ) 
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className={styles.properties}>

                              <div style={{height:'23px'}}></div>
                              <div>
                                <h3 className={styles.title}>{prd.title}</h3>
                              </div>
                              <div className={styles.ersalAndstar}>
                                <div style={{fontSize: '12x' , fontWeight: '600'}}>
                                  {prd.rate}
                                </div>
                                <div style={{fontWeight: '500' , fontSize: '11px'}}>ارسال سریع دیجی کالا</div>
                              </div>
                              <div>
                                <div className={styles.pricePercent}>
                                  <span className={styles.price} dir='ltr'>
                                    <img src="/src/assets/IMGS/PishnahadIMGs/SVGs/toman.png" style={{width:'11px'}}/>{prd.price}
                                  </span >
                                  {prd.percent && <div className={styles.percent}>
                                    {prd.percent}%
                                  </div>}
                                </div>
                                <span className={styles.prevPrice}>
                                  {prd.prevPrice}
                                </span>
                              </div>

                            </div>
                          </div>
                        </article>
                      </div>
                    </Link>
                  </div>
                )
              }
              )}

            </div>
          </section>
          <section className={styles.RightSec} dir="rtl">
            <div>
              <div style={{border: '1px solid #e0e0e2', borderRadius: '8px' , height: 'auto'}}>
                <div style={{padding: '16px 20px'}}>
                  <div style={{color: '#3f4064', fontWeight: '700' , fontSize: '24px'}}>فیلتر ها</div>
                  <div></div>
                </div>
                <div style={{padding: '0 20px'}}>
                {/* {console.log(minPrice , maxPrice)} */}
                {/* زمانی که شوینگ آیتمز عوض شود ، باید مینیمم و ماکسیمم رنج هم دوباره حساب شوند */}
                <PriceRange min={minPrice} max={maxPrice} showingItems={showingItems} setShowingItems={setShowingItems} BeforeRange={filteredBeforeRangersRef}/>

                </div>
                <div style={{padding: '0 20px'}}>
                  <div style={{padding: '12px 0', color: '#3f4064', fontWeight: '700' , fontSize: '19px' , borderBottom: '1px solid #f0f0f1'}}>رنگ</div>
                  <div></div>
                </div>
                
              </div>
              <div></div>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default SearchedPage