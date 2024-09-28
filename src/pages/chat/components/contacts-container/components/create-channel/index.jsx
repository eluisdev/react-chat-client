import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multipleselect";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function CreateChannel() {

    const { setSelectedChatType, setSelectedChatData, addChannel } = useAppStore()
    const [newChannelModal, setNewChannelModal] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])
    const [allContacts, setAllContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])
    const [channelName, setChannelName] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
                withCredentials: true
            })
            setAllContacts(response.data.contacts)
        }
        getData()
    }, [])


    const createChannel = async () => {
        try {
            if (channelName.length >= 0 && selectedContacts.length > 0) {
                const response = await apiClient.post(
                    CREATE_CHANNEL_ROUTE, 
                    {
                        name: channelName,
                        members: selectedContacts.map(contact => contact.value)
                    },
                    {withCredentials: true}
                )
                if (response.status === 201) {
                    setChannelName("")
                    setSelectedContacts([])
                    setNewChannelModal(false)
                    addChannel(response.data.channel)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //TODO: Revisar todo
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={() => setNewChannelModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent
                        className="bg-[#1c1b1e] border-none mb-2 p-3 text-white"
                    >
                        Create New Channel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please fill up the details for new channel.</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Channel Name"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={e => setChannelName(e.target.value)}
                            value={channelName}
                        />
                    </div>
                    <div>
                        <MultipleSelector
                            className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                            defaultOptions={allContacts}
                            placeholder="Search Contacts"
                            value={selectedContacts}
                            onChange={setSelectedContacts}
                            emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600">
                                    No results found.
                                </p>
                            }
                        />
                    </div>
                    <Button
                        className="w-full bg-purple-700 hover:bg-purple-800 transition-all duration-300"
                        onClick={createChannel}
                    >
                        Create Channel
                    </Button>

                </DialogContent>
            </Dialog>
        </>
    )
}
