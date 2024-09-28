import { create } from "zustand"
import {devtools} from "zustand/middleware"
import { createAuthSlice } from "./slices/auth-slice"
import { createChatSlice } from "./slices/chat-slice"

export const useAppStore = create()(devtools((...state) => ({
    ...createAuthSlice(...state),
    ...createChatSlice(...state)
})))