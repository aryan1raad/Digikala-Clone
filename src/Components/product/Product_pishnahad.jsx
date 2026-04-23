import React from 'react'

export const Product_pishnahad = () => {
    return (
        <div>
            <div>
                <div>
                    <img src={ProductImg.img} />
                </div>
                <h3>
                    {ProductImg.title}
                </h3>

                <span>
                    {ProductImg.price}
                </span>

                <span>
                    {ProductImg.prevPrice}
                </span>
            </div>
        </div>
    )
}
