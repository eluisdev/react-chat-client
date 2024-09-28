import { useEffect } from "react"
import NewDM from "./components/new-dm/index"
import ProfileInfo from "./components/profile-info"
import { apiClient } from "@/lib/api-client"
import { GET_DM_CONTACTS_ROUTE, GET_USER_CHANNELS_ROUTE } from "@/utils/constants"
import ContactList from "@/components/contact-list"
import { useAppStore } from "@/store"
import CreateChannel from "./components/create-channel"
import logoPortafolio from "../../../../assets/logoPortafolio.png"

export default function ContactsContainer() {

  const { directMessagesContacts, setDirectMessagesContacts, channels, setChannels } = useAppStore()

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, { withCredentials: true })
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts)
      }
    }

    const getChannels = async () => {
      
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, { withCredentials: true })
      if (response.data.channels) {
        setChannels(response.data.channels)
      }
    }

    getContacts()
    getChannels()
  }, [])

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border[#2f3036] w-full">
      <div className="p-5 flex items-center justify-center gap-2">
        <img src={logoPortafolio} className="w-12 h-12 rounded-full" style={{filter: "drop-shadow(rgb(255, 255, 255) 1px 1px 4px)"}}/> 
        <span className="text-3xl font-semibold flex flex-col justify-center items-center">Syncronus <span className="text-xs text-yellow-400">CHAT APP</span></span>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct messages" />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  )
}