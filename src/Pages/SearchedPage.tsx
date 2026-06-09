import { Link, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react";
import { useProductContext } from "../CustomHooks/useProductContext";
import styles from '../assets/Styles/SearchedPage.module.css'
import PriceRange from "../Components/PriceRange";
import { useGetProducts } from "../../DB/services/GetMethod";
import { useSearchStore } from "../Stores/useSearchStore";
import { Product } from "../types/product";


const SearchedPage = () => {
  const { data: items = [] } = useGetProducts();
  const [searchParams] = useSearchParams();
  const { category: URLcategory = "" } = useParams();

  const query = useSearchStore(state => state.query);
  const category = useSearchStore(state => state.category);
  const sorter = useSearchStore(state => state.sorter);
  const currentMin = useSearchStore(state => state.currentMin);
  const currentMax = useSearchStore(state => state.currentMax);

  const setQuery = useSearchStore((state) => state.setQuery);
  const setCategory = useSearchStore((state) => state.setCategory);
  const setSorter = useSearchStore((state) => state.setSorter);
  const setPriceRange = useSearchStore((state) => state.setPriceRange);
  const resetFilters = useSearchStore((state) => state.resetFilters);

  const qParam = searchParams.get("q") ?? "";
  useEffect(() => {
    window.scrollTo({ top: 0 });

    resetFilters();
    setQuery(qParam);
    setCategory(URLcategory);

  }, [URLcategory, qParam, resetFilters, setQuery, setCategory]);

  const baseItems = useMemo(() => {
    let result = [...items];
    const QueryLower = query.trim().toLowerCase();
    if (QueryLower) {
      result = result.filter((item) => item.title.toLowerCase().includes(QueryLower))
    };

    const CategoryTrim = category.trim();
    if (CategoryTrim) {
      result = result.filter((item) => item.catergory.trim() === CategoryTrim)
    }

    if (sorter === 'price') {
      result.sort((a, b) => a.priceNumber - b.priceNumber)
    } else if (sorter === 'takhfif') {
      result.sort((a, b) => (a.percent ?? 0) - (b.percent ?? 0))
    }

    return result
  }, [items, query, category, sorter]);

  const { absoluteMin, absoluteMax } = useMemo(() => {
    if (!baseItems.length) {
      return { absoluteMin: 0, absoluteMax: 0 };
    }

    let min = baseItems[0].priceNumber;
    let max = baseItems[0].priceNumber;

    for (const item of baseItems) {
      if (item.priceNumber < min) min = item.priceNumber;
      if (item.priceNumber > max) max = item.priceNumber;
    }

    return { absoluteMin: min, absoluteMax: max };
  }, [baseItems]);

  useEffect(() => {
    if (baseItems.length > 0) {
      setPriceRange(absoluteMin, absoluteMax);
    }
    else setPriceRange(0, 0);
  }, [baseItems.length])

  const showingItems = useMemo(() => {
    return baseItems.filter(
      (item) =>
        item.priceNumber >= currentMin && item.priceNumber <= currentMax
    );
  }, [baseItems, currentMin, currentMax]);
  return (
    <div className={styles.Cont}>
      <div className={styles.InnerCont}>
        <div className={styles.innerFlex}>

          <section className={styles.LeftSec}>
            <div className={styles.sortingCont} dir="rtl">
              <div className={styles.sorting}>
                <div dir="rtl">مرتب سازی :</div>
                {/* <div onClick={() => setSorter('view')}>پربازدید ترین</div> */}
                <div onClick={() => setSorter(null)} style={sorter === null ? { color: '#ef394e', fontWeight: '700', userSelect: 'none' } : { fontWeight: '700', userSelect: 'none' }}>دیفالت</div>
                <div onClick={() => setSorter('price')} style={sorter === 'price' ? { color: '#ef394e', fontWeight: '700', userSelect: 'none' } : { fontWeight: '700', userSelect: 'none' }}>ارزان ترین</div>
                <div onClick={() => setSorter('takhfif')} style={sorter === 'takhfif' ? { color: '#ef394e', fontWeight: '700', userSelect: 'none' } : { fontWeight: '700', userSelect: 'none' }}>بیشترین تخفیف</div>
              </div>

              <div style={{ marginRight: 'auto' }}>
                {showingItems.length} کالا
              </div>
            </div>

            {/*جایی که محصولات سرچ شده ی ما نمایش داده خواهند شد*/}
            <div className={styles.ShowingGrid}>

              {/*مپ کردن محصولات سرچ شده */}
              {showingItems.map((prd, index) => {
                return (
                  <div key={prd.id} className={styles.product_div}>
                    <Link to={`/product/${prd.id}`} className={styles.product_a}>
                      <div className={styles.product_inner}>
                        <article className={styles.article}>
                          <div className={styles.article_inner}>
                            <div></div>
                          </div>

                          <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                              <div dir="rtl" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex' }}>
                                <div className={styles.imgCont}>
                                  <img src={prd.img} alt={prd.title} />
                                </div>
                                <div className={styles.product_colors}>
                                  {prd.colors.map((color: string) => {
                                    if (color) return (
                                      <span className={styles.circleSpan} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: `${color}` }}></span>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className={styles.properties}>

                              <div style={{ height: '23px' }}></div>
                              <div>
                                <h3 className={styles.title}>{prd.title}</h3>
                              </div>
                              <div className={styles.ersalAndstar}>
                                <div style={{ fontSize: '12x', fontWeight: '600' }}>
                                  {prd.rate}
                                </div>
                                <div style={{ fontWeight: '500', fontSize: '11px' }}>ارسال سریع دیجی کالا</div>
                              </div>
                              <div>
                                <div className={styles.pricePercent}>
                                  <span className={styles.price} dir='ltr'>
                                    <img src="/IMGS/PishnahadIMGs/SVGs/toman.png" style={{ width: '11px' }} />{prd.price}
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
              <div style={{ border: '1px solid #e0e0e2', borderRadius: '8px', height: 'auto' }}>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ color: '#3f4064', fontWeight: '700', fontSize: '24px' }}>فیلتر ها</div>
                  <div></div>
                </div>
                <div style={{ padding: '0 20px' }}>
                  {/* زمانی که شوینگ آیتمز عوض شود ، باید مینیمم و ماکسیمم رنج هم دوباره حساب شوند */}
                  <PriceRange
                    min={absoluteMin}
                    max={absoluteMax}
                  />

                </div>
                {/* رنگ
                <div style={{padding: '0 20px'}}>
                  <div style={{padding: '12px 0', color: '#3f4064', fontWeight: '700' , fontSize: '19px' , borderBottom: '1px solid #f0f0f1'}}>رنگ</div>
                  <div></div>
                </div> */}

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