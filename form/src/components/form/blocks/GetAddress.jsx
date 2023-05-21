import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function GetAddress(props) {

    const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";

    const [selectedData, setSelectedData] = useState({});
    const [addressInput, setAddressInput] = useState("");
    const [addressData, setAddressData] = useState([{}]);
    const [formValue, setFormValue] = useState("");
    const [districtTable] = useState({
        "D1": ["01", "02", "03", "04", "05", "06"],
        "D2": ["07", "08"],
        "D3": ["14", "15", "16"],
        "D4": ["09", "10"],
        "D5": ["11", "12", "13"],
        "D6": ["17"],
        "D7": ["18", "19"],
        "D8": ["20", "21"],
        "D9": ["22", "23"],
        "D10": ["24", "25", "26", "27"],
        "D11": ["28", "29", "30"],
        "D12": ["31", "32", "33"],
        "D13": ["34", "35", "36"],
        "D14": ["38", "39", "40", "41"],
        "D15": ["42", "43", "44", "45"],
        "D16": ["46", "47", "48"],
        "D17": ["49", "50", "81"],
        "D18": ["51", "52"],
        "D19": ["53", "54", "55", "82"],
        "D20": ["56", "57"],
        "D21": ["58", "59"],
        "D22": ["60", "61", "62", "63", "64"],
        "D23": ["65", "66", "67", "68"],
        "D24": ["69", "70", "71"],
        "D25": ["72", "73"],
        "D26": ["77", "78"],
        "D27": ["75", "76"],
        "D28": ["79", "80"]
    });

    const fetchData = useCallback(async (e) => {

        setAddressInput(e.target.value);
        setFormValue(e.target.value);

        if (addressInput === "") {
            setAddressData([]);
        } else {
            setAddressData([]);
            try {
                const endpoint = `${baseApiUrl}${addressInput}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
                let response = await axios.get(endpoint);
                let list = response.data.results;

                list.forEach((l) => {
                    if (l.BLK_NO && l.POSTAL !== "NIL") {
                        let eachData = l.ADDRESS;
                        let modifiedAddress = eachData.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        let block = l.BLK_NO;
                        let roadName = l.ROAD_NAME.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        let building = l.BUILDING.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        let postalCode = l.POSTAL;
                        let coordinates = [l.LATITUDE, l.LONGTITUDE];
                        let getDistrict = (a) => {
                            let firstTwoDigit = a.substring(0, 2);
                            for (let [key, i] of Object.entries(districtTable)) {
                                if (i.includes(firstTwoDigit)) {
                                    return key;
                                };
                        }};
                        let district = getDistrict(postalCode);
                        let clone = addressData.slice();
                        // console.log(clone)
                        if (!clone.some((eachObject) => Object.values(eachObject).includes(modifiedAddress))) {
                            let object = {
                                "address": modifiedAddress,
                                "block": block,
                                "roadName": roadName,
                                "building": building,
                                "postalCode": postalCode,
                                "district": district,
                                "coordinates": coordinates
                            };
                            // console.log("each object", object)
                            let modifiedClone = [...clone, object];
                            setAddressData(modifiedClone);
                        };
                    };
                }
                );

            } catch (error) {
                console.error('Error fetching data:', error);
            };
        };
    },[addressData, addressInput, districtTable]);

    useEffect(() => {
        if (selectedData) {
            setFormValue(selectedData.address);
            setAddressInput("");
            props.updateParentValue(selectedData);
        }
        // eslint-disable-next-line
    }, [selectedData]);

    return (
        <>
            <div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="demo" onChange={fetchData} value={formValue || ""} />
                    <ul className="list-group">
                        {addressInput ? addressData.map((d, index) => { return (<li className="list-group-item" key={`${d.postalCode}-${index}`} onClick={() => { setSelectedData(d, index) }}>{d.address}</li>) }) : null}
                    </ul>
                    <label htmlFor="floatingInput">{props.label}</label>
                </div>
            </div>

        </>
    );
};