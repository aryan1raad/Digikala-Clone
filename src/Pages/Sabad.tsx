import { useEffect, useMemo } from "react"
import { useProductContext } from "../hooks/useProductContext"
import styles from '../assets/Styles/Sabad.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useGetCart, useGetCartWithDetails } from "../../DB/services/GetMethod";
import { useAddToCart, useSubFromCart } from '../../DB/services/PostMethod'

const Sabad = ({ selectedProduct, SetSelectedProducts, removeItem, clearAll }) => {
  const colorNames = {
    blue: { persian: 'آبی', secondUsed: '#5288ff' },
    black: { persian: 'مشکی', secondUsed: '#232323' },
    pink: { persian: 'صورتی', secondUsed: '#cd7fc1' },
    red: { persian: 'قرمز', secondUsed: '#b50021' },
    green: { persian: 'سبز', secondUsed: '#38c550' },
    white: { persian: 'سفید', secondUsed: '#c3c3c3' },
    gold: { persian: 'طلایی', secondUsed: '#b89e13' },
    gray: { persian: 'خاکستری', secondUsed: '#5c5c5c' },
    navy: { persian: 'سرمه ای', secondUsed: '#00009e' },
    orange: { persian: 'نارنجی', secondUsed: '#e67700' },
    purple: { persian: 'بنفش', secondUsed: 'purple' },
  };
  const navigate = useNavigate();

  const { items , user } = useProductContext();
  const { data: itemsInCart } = useGetCart();
  const { data: CartWithDetail = [] } = useGetCartWithDetails();
  const { mutate: AddMutate } = useAddToCart();
  const { mutate: SubMutate } = useSubFromCart();
  //نیو آیتمز دو پراپرتی رنگ و آیتمی که از آرایه ی آیتمز گرفته را درخود دارد
  if(!user || !user.isAuthorized) {
    return null
  }
  let newItems = [];
  //محصولاتی را که آیدی آنها رابطه دارد ، نگه میداریم تا در رندر کردن  پیمایش آرایه کوتاه تر شود
  const ProductsRelated = useMemo(() => {
    if(itemsInCart){
      for (let i = 0; i < itemsInCart?.length; i++) {
        const shownUp = items.find(each => each.id == itemsInCart.productId);
        if(shownUp)
          return shownUp;
      }
    }
  }, [items , itemsInCart])

  selectedProduct.forEach((thisOne) => {
    const foundItem = items.find((item) => thisOne.id === item.id)
    if (foundItem) {
      newItems.push({ foundItem: foundItem, color: thisOne.color })
    }
  });


  const decreaseItem = (productId: string | number, color: string) => {
    SubMutate({productId , color})
  };

  const addOneItemToCart = (id: string, color: string) => {
    AddMutate(
        {
        productId:id,
        color:color
      },
      {
        onSuccess:() => console.log('add shod')
      }
    )
  }

  return (
    <div className={styles.Cont}>
      <div style={{ width: '100%' }} className={styles.SabadContainer}>
        <ul className={styles.sabadUl}>
          <li className={styles.sdf}>
            {/* محاسبه تعداد کلا با استفاده از پراپرتی تعداد که در این کامپوننت محاسبه شده */}
            <div className={styles.square}>
              {CartWithDetail.reduce((acc, curr) => acc + curr.quantity, 0)}
            </div>
            <div>سبد خرید</div>
          </li>
          {/* <li className={styles.sdf2}>خرید بعدی</li> */}
        </ul>

        <ul className={styles.prdCont}>
          <div className={styles.takmil}>
            <div style={{ position: 'sticky', top: '10px', padding: '10px 20px', border: '1px solid #e0e0e2', borderRadius: '8px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px' }} dir="rtl">

                <div style={{ fontSize: '12px', fontWeight: '600', color: '#23254e' }}>جمع سبد خرید</div>
               
                <div style={{ display: 'flex' }}>
                  {Intl.NumberFormat().format(
                    CartWithDetail.reduce((acc, curr) => acc + (curr.quantity * curr.productDetails.priceNumber), 0)
                  )}
                  <div className={styles.toman}><img src="/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" /></div>
                </div>

              </div>
              <div></div>
              <div></div>
              <div className={styles.takmilBTN}>تایید و تکمیل سفارش</div>
            </div>
          </div>
          <div style={{ flexDirection: 'column' }} className={styles.prdCont}>
            {/* {itemsInCart.map((eachItem) => {

            })} */}
            {CartWithDetail.map((itm, index) => {
              return (
                <Link to={`/product/${itm.productDetails.id}`} className={styles.prd} dir="rtl" key={index}>
                  <div className={styles.rightSideDetail}>
                    <div className={styles.imgANDprice}>
                      <div className={styles.imgCont}>
                        <img src={itm.productDetails.img} alt="" />
                      </div>

                      {/* پریونت دیفالت برای عدم نویگیت به پروداکت مورد نظر */}
                      <div className={styles.tedadCont} onClick={(e) => e.preventDefault()}>
                        {/* اضافه */}
                        <div onClick={(e) => { e.preventDefault(); addOneItemToCart(itm.productDetails.id, itm.color) }} className={styles.plus}>+</div>
                        <div className={styles.tedad}>{itm.quantity}</div>
                        {/* حذف */}
                        <div onClick={(e) => { e.preventDefault(); decreaseItem(itm.productDetails.id, itm.color) }} className={styles.minus}>-</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                      <div className={styles.title}>{itm.productDetails.title}</div>
                      <div>
                        <div style={{ color: '#81858b', fontSize: '14px' }}>{itm.color ? `رنگ ${colorNames[itm.color].persian}` : ''}</div>
                        <div style={{ color: '#81858b', fontSize: '14px' }}>گارانتی اصالت و سلامت فیزیکی کالا</div>
                        <div style={{ color: '#81858b', fontSize: '14px' }}>ارسال دیجی کالا</div>
                      </div>
                    </div>
                  </div>

                  <div style={itm.color ? { backgroundColor: `${colorNames[itm.color].secondUsed}` } : {}} className={styles.color}></div>

                </Link>
              )
            })}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Sabad