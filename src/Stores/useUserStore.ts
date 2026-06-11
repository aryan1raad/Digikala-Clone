import { create } from "zustand";
import { persist } from "zustand/middleware";

interface user {
    isAuthorized: boolean,
    userName: string | null,
    numOrMail: string | number | null
}
interface useUserStore {
    user: user,
    setUser: (newUser: user) => void,
    resetUser: () => void
}
//ذخیره کاربر
//زاستند + لوکال استورج
export const useUserStore = create<useUserStore>()(
    //دو پرانتز برای نیاز به ارسال تایپ به میان افزار هست
    persist(
        (set) => ({
            user: {
                isAuthorized: false,
                userName: null,
                numOrMail: null
            },

            //تغییر و اصلاح باید دستی انجام شود
            setUser: (newUser) => set({ user: newUser }),
            resetUser: () => set({
                user: {
                    isAuthorized: false,
                    userName: null,
                    numOrMail: null
                }
            })
        })
        ,
        //کلید
        {
            name: 'userStorage'
        }
    )
)