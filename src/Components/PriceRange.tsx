import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../assets/Styles/SearchedPage.module.css";
import { useSearchStore } from "../Stores/useSearchStore";

interface PriceRangeProps {
    min?: number;
    max?: number;
}

const PriceRange = ({ min = 0, max = 50000000 }: PriceRangeProps) => {
    const setPriceRange = useSearchStore((state) => state.setPriceRange);

    const [minValue, setMinValue] = useState(min);
    console.log('min', min, 'minValue', minValue)
    const [maxValue, setMaxValue] = useState(max);
    const [dragging, setDragging] = useState<"min" | "max" | null>(null);
    const [tabIsOpen, setTabOpen] = useState(false);

    const trackRef = useRef<HTMLDivElement>(null);

    const format = useMemo(() => new Intl.NumberFormat("fa-IR"), []);

    useEffect(() => {
        setMinValue(min);
        setMaxValue(max);
    }, [min, max]);

    const getValueFromClientX = (clientX: number) => {
        if (!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();
        const width = rect.width || 1;

        // برای RTL: درصد را از راست محاسبه کنید
        let percent = 1 - ((clientX - rect.left) / width);

        // بین 0 و 1 باید باشد
        percent = Math.max(0, Math.min(1, percent));

        const raw = min + percent * (max - min);
        return Math.round(raw);
    };

    const getPercent = (val: number) => {
        if (max === min) return 0;
        return ((val - min) / (max - min)) * 100;
    };

    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const newValue = getValueFromClientX(e.clientX);

            if (dragging === "min") {
                setMinValue((prevMin) => {
                    const next = Math.min(newValue, maxValue);
                    return next <= maxValue ? next : prevMin;
                });
            }

            if (dragging === "max") {
                setMaxValue((prevMax) => {
                    const next = Math.max(newValue, minValue);
                    return next >= minValue ? next : prevMax;
                });
            }
        };

        const handleMouseUp = () => {
            setDragging(null);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, minValue, maxValue, min, max]);

    const applyRange = () => {
        const nextMin = Math.min(minValue, maxValue);
        const nextMax = Math.max(minValue, maxValue);
        setPriceRange(nextMin, nextMax);
    };

    const resetRange = () => {
        setMinValue(min);
        setMaxValue(max);
        setPriceRange(min, max);
    };

    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    return (
        <div
            style={{
                padding: "12px 0",
                color: "#3f4064",
                fontWeight: "700",
                fontSize: "19px",
                borderBottom: "1px solid #f0f0f1",
            }}
        >
            <div onClick={() => setTabOpen((prev) => !prev)} style={{ userSelect: "none", cursor: "pointer" }}>
                محدوده قیمت
            </div>

            <div
                className={styles.container}
                style={{
                    maxHeight: `${tabIsOpen ? "350px" : "0px"}`,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    padding: `${!tabIsOpen ? "0" : "16px 12px"}`,
                }}
            >
                <div className={styles.labels}>
                    <div className={styles.PriceRange}>
                        <div style={{ fontWeight: "700", fontSize: "16px", lineHeight: "2.15", color: "#81858b" }}>
                            از
                        </div>
                        <div style={{ width: "100%", textAlign: "center", borderBottom: "1px solid #e0e0e2" }}>
                            <p
                                style={{
                                    fontWeight: "900",
                                    fontSize: "1.7rem",
                                    lineHeight: "2.1",
                                    color: "#3f4064",
                                    margin: "0",
                                }}
                            >
                                {format.format(minValue)}
                            </p>
                        </div>
                        <div className={styles.PriceRangeImgCont}>
                            <img src="/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" style={{ scale: "0.5" }} />
                        </div>
                    </div>

                    <div className={styles.PriceRange}>
                        <div style={{ fontWeight: "700", fontSize: "16px", lineHeight: "2.15", color: "#81858b" }}>
                            تا
                        </div>
                        <div style={{ width: "100%", textAlign: "center", borderBottom: "1px solid #e0e0e2" }}>
                            <p
                                style={{
                                    fontWeight: "900",
                                    fontSize: "1.7rem",
                                    lineHeight: "2.1",
                                    color: "#3f4064",
                                    margin: "0",
                                }}
                            >
                                {format.format(maxValue)}
                            </p>
                        </div>
                        <div className={styles.PriceRangeImgCont}>
                            <img src="/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" style={{ scale: "0.5" }} />
                        </div>
                    </div>
                </div>

                <div ref={trackRef} className={styles.track} style={{ position: "relative", margin: "20px 0" }}>
                    <div className={styles.trackBackground}></div>

                    <div
                        className={styles.filled}
                        style={{
                            right: `${minPercent}%`,
                            width: `${Math.max(maxPercent - minPercent, 0)}%`,
                        }}
                    />

                    <div
                        onMouseDown={() => setDragging("min")}
                        className={styles.thumb}
                        style={{ right: `${minPercent}%`, cursor: "pointer" }}
                    />

                    <div
                        onMouseDown={() => setDragging("max")}
                        className={styles.thumb}
                        style={{ right: `${maxPercent}%`, cursor: "pointer" }}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", marginBottom: "16px" }} dir="ltr">
                    <span style={{ fontSize: "12px", color: "#81858b" }}>گرانترین</span>
                    <span style={{ fontSize: "12px", color: "#81858b" }}>ارزانترین</span>
                </div>

                <button
                    type="button"
                    onClick={applyRange}
                    style={{
                        width: "100%",
                        backgroundColor: "#00bcd4",
                        color: "white",
                        fontWeight: "700",
                        padding: "8px",
                        border: "none",
                        marginTop: "10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    اعمال
                </button>

                <button
                    type="button"
                    onClick={resetRange}
                    style={{
                        width: "100%",
                        background: "linear-gradient(225deg, #d22c4e, #ee384e, #ef5662)",
                        color: "white",
                        fontWeight: "700",
                        padding: "8px",
                        border: "none",
                        marginTop: "10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    بازنشانی محدوده
                </button>
            </div>
        </div>
    );
};

export default PriceRange;