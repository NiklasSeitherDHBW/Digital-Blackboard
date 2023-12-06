import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPCSF20BXJ_qysy7MRnYpfwa08Yplo6sw",
    authDomain: "digital-blackboard-dhbw.firebaseapp.com",
    projectId: "digital-blackboard-dhbw",
    storageBucket: "digital-blackboard-dhbw.appspot.com",
    messagingSenderId: "354760127659",
    appId: "1:354760127659:web:1c3b9888bd88647a2fb3ee",
    measurementId: "G-F8VPDM77YE"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db };

import {collection, getDocs, addDoc, Timestamp} from 'firebase/firestore'

// All database operations regarding dual living page

export async function fetchAdsDualLiving() {
    const querySnapshot = await getDocs(collection(db, "dual-living"));

    // Convert the QueryDocumentSnapshots into an array of dictionaries
    const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        // Display dates in format TT.MM.YYYY
        tmp["date_created"] = new Date(tmp["date_created"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["available_from"] = new Date(tmp["available_from"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["available_until"] = new Date(tmp["available_until"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["availability"] = tmp["available_from"] + " - " + tmp["available_until"];

        tmp["furniture"] = tmp["furniture"] ? "Ja" : "Nein";
        tmp["community"] = tmp["community"] ? "Ja - " + tmp["community_type"] : "Nein";

        tmp["adType"] = "dualLiving";

        return tmp;
    });

    console.log(transformedData)

    return transformedData;
}

export async function createAdDualLiving(formData, images, contactData) {
    // Split date by every component to create a date object for firebase
    let fromParts = formData.availableFrom.split("-")
    let untilParts = formData.availableTill.split("-")

    // Create new document
    let new_item = {
        title: formData.title,
        date_created: Timestamp.fromDate(new Date()),

        available_from: Timestamp.fromDate(new Date(fromParts[0], fromParts[1] - 1, fromParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        available_until: Timestamp.fromDate(new Date(untilParts[0], fromParts[1] - 1, fromParts[2])),
        area: formData.area,
        rooms: formData.rooms,
        price: formData.price,

        description: formData.description,
        location: formData.location,
        furniture: formData.furniture,
        community: formData.community,
        community_type: formData.selectedGender,

        images: images,

        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,

        userId: formData.userId,
    }

    // Store advertisement in database
    await addDoc(collection(db, "dual-living"), new_item);
}


// All database operations regarding events, infos and workshops page

export async function fetchAdsEvents() {
    const querySnapshot = await getDocs(collection(db, "events-parties"));

    // Convert the QueryDocumentSnapshots into an array of dictionaries
    const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        // Display dates in format TT.MM.YYYY
        tmp["date_created"] = new Date(tmp["date_created"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["date"] = new Date(tmp["date"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        tmp["availability"] = tmp["members"] + " / " + tmp["max_participants_limit"];

        tmp["adType"] = "events";

        return tmp;
    });

    return transformedData;
}


// All database operations regarding study hub page

export async function fetchAdsStudyHub() {
    const querySnapshot = await getDocs(collection(db, "study-hub"));

    // Convert the QueryDocumentSnapshots into an array of dictionaries
    const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        // Display dates in format TT.MM.YYYY
        tmp["date_created"] = new Date(tmp["date_created"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        tmp["adType"] = "studyHub"

        return tmp;
    });

    return transformedData
}