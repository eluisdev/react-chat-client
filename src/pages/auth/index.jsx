import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiClient } from "@/lib/api-client"
import { useAppStore } from "@/store"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import logoPortafolio from "../../assets/logoPortafolio.png"
import fondo from "../../assets/fondo.svg"

export const Auth = () => {

  const navigate = useNavigate()
  const { setUserInfo } = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.")
      return false
    }
    if (!password.length || password.length < 6) {
      toast.error("Password is required and more than six characters.")
      return false
    }
    return true
  }

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.")
      return false
    }
    if (!password.length || password.length < 6) {
      toast.error("Password is required and more than six characters.")
      return false
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.")
      return false
    }
    return true
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (validateLogin()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        )
        setUserInfo(response.data.user)
        if (response.data.user.profileSetup) navigate("/chat")
        else navigate("/profile")
      } catch (error) {
        toast.error(error.response.data)
      }

    }

  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (validateSignup()) {
      try {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        )
        if (response.status === 201) {
          setUserInfo(response.data.user)
          navigate("/profile")
        }
      } catch (error) {
        toast.error(error.response.data)
      }
     
    }
  }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-blue-100/50">
      <div className="h-[80vh] bg-white/40 border-2 border-white text-opacity-90 shadow-2xl w-[80vw] lg:w-[65vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={logoPortafolio} alt="perfil marca" className="w-12 h-12 rounded-full mt-1" />
            </div>
            <p className="font-medium text-center">Fill in the details to get started with the best chat app!</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Sing up</TabsTrigger>
              </TabsList>
              <form onSubmit={handleLogin}>
                <TabsContent className="flex flex-col gap-5 mt-10" value="login" >
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-6"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  // autoComplete={email}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-6"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Button className="rounded-full p-6">Login</Button>
                </TabsContent>
              </form>
              <form onSubmit={handleSignup}>
                <TabsContent className="flex flex-col gap-5" value="signup">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-6"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  // autoComplete={email}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-6"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    className="rounded-full p-6"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  // autoComplete={confirmPassword}
                  />
                  <Button className="rounded-full p-6">Signup</Button>
                </TabsContent>
              </form>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={fondo} alt="logo-portafolio" className="h-[400px] p-6" />
        </div>
      </div>

    </div>
  )
}
