import React, { useContext } from 'react';
import AuthContext from '../authcontext/AuthContext';



export default function PropertyProfile() {

    const authData = useContext(AuthContext);

    return (
        <>

            <div id="modal-lg" size="lg" ref="propertyProfileModal" hide-footer hide-header centered>
                <div class="row">
                    <div class="col-sm-6">
                        <h5>Property Profile</h5>
                    </div>
                    <div class="col-sm-6 d-block text-end">
                        <h6>SGxProperty</h6>
                    </div>
                </div>
                <div class="row" style="border:solid red 1px">
                </div>
                {/* <!-- Type of Sale --> */}
                <div class="row my-1">
                    <h5>{{ propertyProfileListingSubType }}</h5>
                </div>

                {/* <!-- images --> */}
                <div class="d-block text-center">
                    <div class="row">

                        <div class="row justify-content-center">

                            {/* <img class="photo" v-for="p in propertyProfileImages" :key="p" :src=p
                                                alt="Image"> */}

                        </div>
                    </div>
                </div>
                {/* <!-- headline --> */}
                <div class="row my-1" style="border:solid red 1px">
                </div>
                <div class="row my-1">
                    <h6 class="fw-bold">{{ propertyProfileHeadline }}</h6>
                </div>
                {/* <!-- district and address --> */}
                <div class="row mt-1">
                    <h6>District {{ selectedDistrict }} - {{ selectedProject }}</h6>
                </div>
                <div class="row">
                    <h6>{{ selectedBlock }} {{ selectedStreetName }} Singapore {{ selectedPostalCode }}</h6>
                </div>
                {/* <!-- description --> */}
                <div class="row mt-1">
                    <h6>Description</h6>
                </div>
                <div class="row">
                    <p class="fw-light">{{ propertyProfileDescription }}</p>
                </div>
                {/* <!-- table of listing data --> */}


                <div class="row my-1">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Type</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ selectedPropertyType }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Sub Type</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ selectedPropertySubType }}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row my-1">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Tenure</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ selectedPropertyTenure }}</h6>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">W.E.F</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ selectedPropertyWef }}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row my-1">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">TOP</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ selectedPropertyTop }}</h6>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Sale Condition</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ propertyProfileTerm }}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row my-1">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Land Area</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ propertyProfileLandSize }}</h6>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Floor Area</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ propertyProfileBuiltSize }}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row my-1">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Maintanence Fee</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ propertyProfileMaintFee }}</h6>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">GST</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ propertyProfileGst }}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row my-1">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">Unit No.</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ propertyProfileUnit }}</h6>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="fw-light">No. of Rooms</h6>
                            </div>
                            <div class="col-6">
                                <h6>{{ propertyProfileRooms }}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center mt-4">
                    {/* 
                                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                                        @click="closePropertyProfile">Close</b-button>
                                </div> */}
                </div>
                </div>
            </>
            )

}