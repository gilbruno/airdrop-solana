const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL 
} = require('@solana/web3.js')


const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

console.log(publicKey)
console.log(secretKey)

//---------------------------------------------------------------- getWalletBalance
const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Walletbalance is ${walletBalance}`)
    }catch(err) {
        console.log(err)
    }
}

//--------------------------------------------------------------------- airdropSol
const airdropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirdropSignature)

    }catch(err){
        console.log(err)
    }
}
const main = async() => {
    await getWalletBalance()
    await airdropSol()
    await getWalletBalance()
}

main()

