import { useContext, useEffect } from "react"
import { ProductContext } from "../App"
import styles from '../assets/Styles/Sabad.module.css'
const Sabad = ({selectedProduct}) => {
  const colorNames = {
    blue: {persian:'آبی', secondUsed: '#5288ff'},
    black: {persian:'مشکی', secondUsed: '#232323'},
    pink: {persian:'صورتی', secondUsed: '#cd7fc1'},
    red: {persian:'قرمز', secondUsed: '#b50021'},
    green: {persian:'سبز', secondUsed: '#38c550'},
    white: {persian:'سفید', secondUsed: '#c3c3c3'},
    gold: {persian:'طلایی', secondUsed: '#b89e13'},  
    gray: {persian:'خاکستری', secondUsed: '#373737'},
    navy: {persian:'سرمه ای', secondUsed: '#00009e'},
    orange: {persian:'نارنجی', secondUsed: '#e67700'},
    purple: {persian:'بنفش', secondUsed: 'purple'},
  };
  const {items} = useContext(ProductContext);
  //نیو آیتمز دو پراپرتی رنگ و آیتمی که از آرایه ی آیتمز گرفته را درخود دارد
  let newItems = [];
  //آیتمی که قرار هست با تعداد سفارش نشان داده بشه
  let ProductsAtCart = [];
  selectedProduct.forEach((thisOne) => {
    const foundItem = items.find((item) => thisOne.id === item.id)
    if (foundItem) {
      newItems.push({foundItem: foundItem , color: thisOne.color})
    }
  });

  //حلقه های پایین برای 
  if(newItems){
    let tedad = 0;
    let Hafeze = null;
    for (let i = 0; i < newItems.length; i++) {
      for (let j = i; j < newItems.length; j++) {
        
        if((newItems[i].foundItem.id === newItems[j].foundItem.id) && (newItems[i].color === newItems[j].color)){
          tedad++;
          Hafeze = j
        }
      }
      //نکته
      // در این کد رنگ پیاده سازی نشده است
      //رنگی که میگیرد آخرین رنگی است که ست شده
      const doWeHaveThisObject = ProductsAtCart.some(p => p.foundItem.id === newItems[Hafeze].foundItem.id && p.color === newItems[Hafeze].color)
      // اگر قبلا نشمارده ایم ، اضافه بکنیم
      if (!doWeHaveThisObject && (Hafeze!==null)){ 
        ProductsAtCart.push({foundItem: newItems[Hafeze].foundItem , color : newItems[Hafeze].color , tedad: tedad})
      }
      tedad = 0;
      Hafeze = null;
    }
  }
  console.log(ProductsAtCart)

  console.log(newItems)
  return (
  <div className={styles.Cont}>
    <div style={{width: '100%'}} className={styles.SabadContainer}>
      <ul className={styles.sabadUl}>
        <li className={styles.sdf}>
          {/* محاسبه تعداد کلا با استفاده از پراپرتی تعداد که در این کامپوننت محاسبه شده */}
          <div className={styles.square}>{ProductsAtCart.reduce((acc , curr) => acc + curr.tedad , 0)}</div>
          <div>سبد خرید</div>
        </li>
        <li className={styles.sdf2}>خرید بعدی</li>
      </ul>

      <ul className={styles.prdCont}>
        <div className={styles.takmil}> 
          <div style={{position: 'sticky' , top: '10px' , padding: '10px 20px' , border: '1px solid #e0e0e2' , borderRadius: '8px' , marginTop: '10px'}}>
            <div style={{display: 'flex' , justifyContent: 'space-between' , paddingTop: '12px'}} dir="rtl">

              <div style={{fontSize: '12px' , fontWeight: '600' , color: '#23254e'}}>جمع سبد خرید</div>
              <div style={{display: 'flex'}}>
                {Intl.NumberFormat().format(ProductsAtCart.reduce((acc , curr) => acc + curr.foundItem.priceNumber , 0))}
                <div className={styles.toman}><img src="src/assets/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" /></div>
              </div>
            </div>
            <div></div>
            <div></div>
            <div className={styles.takmilBTN}>تایید و تکمیل سفارش</div>
          </div>
        </div>
        <div style={{flexDirection: 'column'}} className={styles.prdCont}> 
          {ProductsAtCart.map((itm) => {
            return(
            <div className={styles.prd} dir="rtl">
              <div className={styles.rightSideDetail}>
                <div className={styles.imgANDprice}>
                  <div className={styles.imgCont}>
                    <img src={itm.foundItem.img} alt="" />
                  </div>
                  <div className={styles.tedadCont}>
                    <div className={styles.plus}>+</div>
                    <div className={styles.tedad}>{itm.tedad}</div>
                    <div className={styles.minus}>-</div>
                  </div>
                </div>
                <div style={{display: 'flex' , flexDirection: 'column' , marginRight: '5px'}}>
                  <div className={styles.title}>{itm.foundItem.title}</div>
                  <div>
                    <div style={{color: '#81858b' , fontSize: '14px'}}>{itm.color ? `رنگ ${colorNames[itm.color].persian}` : ''}</div>
                    <div style={{color: '#81858b' , fontSize: '14px'}}>گارانتی اصالت و سلامت فیزیکی کالا</div>
                    <div style={{color: '#81858b' , fontSize: '14px'}}>ارسال دیجی کالا</div>
                  </div>
                </div>
              </div>

              <div style={itm.color ? {backgroundColor: `${colorNames[itm.color].secondUsed}`} : {}} className={styles.color}></div>

            </div>  
          )})}
        </div>
      </ul>
    </div>
  </div>
  )
}

export default Sabad