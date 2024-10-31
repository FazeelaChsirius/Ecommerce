
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Initialize Cloud Firestore and get a reference to the service
const storage = getStorage();


const uploadFile = async (file, path) => {
    const bucket = ref(storage, path)
    const snapshot = await uploadBytes(bucket, file)
    const url = await getDownloadURL(snapshot.ref)
    return url;
  }
export default uploadFile;