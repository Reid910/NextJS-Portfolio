'use server'

const access_key_url = `https://oauth.battle.net/token`;
const btoa_secret_id = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);

let access_key = null;
// let expire_time = null; // we need to add expire time so that we ask for a new key.

async function getAccessToken() {
    const response = await fetch(access_key_url, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${btoa_secret_id}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ grant_type: "client_credentials" })
    });

    if (!response.ok) {
        const text = await response.text();
        console.error(`Token request failed: ${response.status} ${response.statusText}\n${text}`);
        throw new Error("Failed to obtain access token.");
    }

    const data = await response.json();
    access_key = data.access_token;
    return data.access_token;
}

// async function getAccessToken() {
//     const response = await fetch(access_key_url, {
//         method: "POST",
//         headers: {
//             "Authorization": `Basic ${btoa_secret_id}`,
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: new URLSearchParams({ grant_type: "client_credentials" }) // Properly format body
//     });
    
//     const data = await response.json();
//     access_key = data.access_token;
//     return data.access_token; // Return access token
// }

function get_key() {
    if (!access_key) {
        // If access_key is not set, return the promise that resolves when it's available
        return getAccessToken().then((key) => {
            // console.log("Access Token received:", key);
            access_key = key; // Set the global variable
            return key; // Return the token
        });
    }
    else {
        return Promise.resolve(access_key);
    }
}

async function fetchResponse(url) {
    const key = await get_key();
    
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${key}`
        }
    });

    if (!response.ok) {
        const text = await response.text(); // get the raw error
        console.error(`API error: ${response.status} ${response.statusText}\n${text}`);
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
        throw new Error(`Empty response from API for ${url}`);
    }

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error(`JSON parse error for ${url}:`, text);
        throw err;
    }
}

// async function fetchResponse(url) {
//     const key = await get_key();
//     // const url = `https://${region || 'us'}.api.blizzard.com/data/d3/season/${season || 1}/leaderboard/${leaderboard || 'achievement-points'}`
//     const response = await fetch(url, {
//         // const response = await fetch('https://us.api.blizzard.com/data/wow/token/?namespace=dynamic-us', {
//         headers: {
//             'Authorization': `Bearer ${key}`
//         }
//     });
//     return await response.json();
// }

async function GetSeasonIndex(region) {
    return await fetchResponse(`https://${region || 'us'}.api.blizzard.com/data/d3/season/`);
}

async function GetSeasonLeaderboardTypes(region,season) {
    return await fetchResponse(`https://${region || 'us'}.api.blizzard.com/data/d3/season/${season || 1}`);
}

async function GetSeasonalLeaderboard(region,season,leaderboard) {
    return await fetchResponse(`https://${region || 'us'}.api.blizzard.com/data/d3/season/${season || 1}/leaderboard/${leaderboard || 'achievement-points'}`);
}

// async function GetEraIndex(region) {
    
// }

// async function GetEraLeaderboardTypes(region,era) {
    
// }

// async function GetEraLeaderboard(region,era,leaderboard) {
    
// }

export { GetSeasonIndex, GetSeasonLeaderboardTypes, GetSeasonalLeaderboard };

// export { }
