import CreatorNFTs from "@/components/NFT_details/CreatorNFTs";





export default function Collection() {
    return (
            <div className="flex flex-col gap-5 justify-center items-center my-[8vh] w-[80%] mx-auto">
                <div className="flex justify-between items-center w-full">
                    <p className="text-2xl font-bold">Creator Collection</p>
                    <button className="bg-stone-800 text-white px-4 py-2 rounded-md">View Creator Profile</button>
                </div>
                <CreatorNFTs/>
            </div>
    )
}
