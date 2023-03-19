const getUser = async()=>{
    try{
        const res = await fetch('http://localhost:5000/infoOfSignup')
        if(res.ok){
            const loginData = await res.json()  // ส่งข้อมูลที่ fetch มาให้ใช้งานได้ หรือ ดึงข้อมูลจาก fetch มาใช้
            return loginData // return loginData ที่ได้รับมาจาก fetch แล้้ว ใช้ func .json()
        }
        else
            throw new Error('cannot readdata')
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
}
export default getUser // import เป็น getuser ได้เลย
// export {getUser} import เป็น {getUser}