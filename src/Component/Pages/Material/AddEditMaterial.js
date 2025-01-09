import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import SimpleReactValidator from "simple-react-validator";
import { callAPI } from "../../../utils/apiUtils";
import { apiUrls } from "../../../utils/apiUrls";
import { ErrorMessage, SuccessMessage } from "../../../helpers/common";
import SubmitButton from "../../Form/SubmitButton";
import InputField from "../../Form/InputField";
import { Link } from "react-router-dom";
import GetAllVendorDropdown from "../../../helpers/GetAllVendorDropdown";
import UnitofMesaurmentDropdown from "../../../helpers/UnitofMesaurmentDropdown";
import ProductTypeDropdown from "../../../helpers/ProductTypeDropdown";


const AddEditMaterial = ({
  open,
  handleclose,
  LanguageListAPI,
  action,
  object,
}) => {
  const defaultState = {
      materialName: "",
      unitCost: '',
      unitOfMeasurement: "",
      stockQuantity: '',
      reorderLevel: '',
      vendorId: "",
      notes: "",
      sku: "",
      isCutSheet:false,
    }

  const [value, setValue] = useState(object?object:defaultState);
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  const handleChange = (e) => {
    setValue((val) => {
      return { ...val, [e.target.name]: e.target.value };
    });
  };

  const languageAdd = async (e) => {
    e.preventDefault();
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    } else {
      try {
        setLoader(true);
        const apiResponse = await callAPI(
          action === "add" ? apiUrls.MaterialCreate : apiUrls.MaterialUpdate,
          {},
          "POST",
          value
        );
        setLoader(false);
        if (apiResponse?.data?.isSuccess) {
          SuccessMessage(apiResponse?.data?.message);
          await LanguageListAPI();
          handleclose();
          setValue(defaultState);
        } else {
          ErrorMessage(apiResponse?.data?.message);
        }
      } catch (error) {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    if (action === "edit") {
      setValue(object);
    } 
    else{
      setValue(defaultState);
    }
    // eslint-disable-next-line
  }, [open, action]);
  
  const handleRadioChange = (e) => {
    setValue({
      ...value,
      isCutSheet: e.target.value === "true",
    });
   
  };


  return (
    <>
      <Dialog
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "800px",
            },
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          className="modal fade show"
          id="contactModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-modal="true"
          role="dialog"
          style={{ display: "block", backgroundColor: "#00000080" }}
        >
          <div className="modal-dialog modal-dialog-centered filter_modal">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="exampleModalLabel">
                  {action === "add" ? "Add Material" : "Update Material"}
                </h1>
                <i
                  className="icofont-close btn-close"
                  onClick={() => {
                    setValue(defaultState);
                    handleclose();
                    simpleValidator.current.hideMessages();
                    forceUpdate();
                  }}
                ></i>
              </div>
              <form onSubmit={languageAdd}>
                <div className="modal-body modale-scroll">
                  <div className="form-design">
                    <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="font-14">
                            Product Type <sup>*</sup>
                          </label>
                          <ProductTypeDropdown
                            value={value.productType}
                            fn={handleChange}
                            load={action}
                          />

                          <div className="error">
                            {simpleValidator.current.message(
                              "productType",
                              value?.productType,
                              `required`
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <InputField
                            labelName={"Material Name"}
                            placeholderName={"Enter Material Name"}
                            type={"text"}
                            handleChange={handleChange}
                            id={"materialName"}
                            name={"materialName"}
                            value={value.materialName}
                            required={true}
                          />
                          <div className="error">
                            {simpleValidator.current.message(
                              "materialName",
                              value?.materialName,
                              `required|min:3`
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <InputField
                            labelName={"Cost"}
                            placeholderName={"Enter Cost"}
                            type={"text"}
                            handleChange={handleChange}
                            id={"unitCost"}
                            name={"unitCost"}
                            value={value.unitCost}
                            required={true}
                          />
                          <div className="error">
                            {simpleValidator.current.message(
                              "unitCost",
                              value?.unitCost,
                              `required|numeric`
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                        <label className="font-14">
                          Unit Of Measure <sup>*</sup>
                          </label>
                          <UnitofMesaurmentDropdown value={value.unitOfMeasurement} fn={handleChange} load={action}/>
                         
                          <div className="error">
                            {simpleValidator.current.message(
                              "Unit Of Measure",
                              value?.unitOfMeasurement,
                              `required`
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <InputField
                            labelName={"Inventory (Qty)"}
                            placeholderName={"Enter Inventory (Qty)"}
                            type={"text"}
                            handleChange={handleChange}
                            id={"stockQuantity"}
                            name={"stockQuantity"}
                            value={value.stockQuantity}
                            required={true}
                          />
                          <div className="error">
                            {simpleValidator.current.message(
                              "Inventory (Qty)",
                              value?.stockQuantity,
                              `required|numeric`
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <InputField
                            labelName={"Reorder Level"}
                            placeholderName={"Enter Reorder Level"}
                            type={"text"}
                            handleChange={handleChange}
                            id={"reorderLevel"}
                            name={"reorderLevel"}
                            value={value.reorderLevel}
                          />
                          <div className="error">
                            {simpleValidator.current.message(
                              "Reorder Level",
                              value?.reorderLevel,
                              `numeric`
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="font-14">
                            Select vendor <sup>*</sup>
                          </label>
                          <GetAllVendorDropdown value={value.vendorId} fn={handleChange} load={action}/>
                          <div className="error">
                            {simpleValidator.current.message(
                              "Vendor",
                              value?.vendorId,
                              `required`
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <InputField
                            labelName={"SKU"}
                            placeholderName={"Enter SKU Number"}
                            type={"text"}
                            handleChange={handleChange}
                            id={"sku"}
                            name={"sku"}
                            value={value.sku}
                            required={true}
                          />
                           <div className="error">
                            {simpleValidator.current.message(
                              "SKU",
                              value?.sku,
                              `required|alpha_num`
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <InputField
                            labelName={"Notes"}
                            placeholderName={"Enter Notes"}
                            type={"text"}
                            handleChange={handleChange}
                            id={"notes"}
                            name={"notes"}
                            value={value.notes}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="font-14">Cut Sheet</label>
                          <div className="d-flex align-items-center gap-3">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                value="true" 
                              checked={value.isCutSheet === true}
                              onChange={handleRadioChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value="false" 
                              checked={value.isCutSheet === false}
                              onChange={handleRadioChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <div className="form-style form-group d-flex align-items-center justify-content-end">
                    <Link
                      to={"#"}
                      className="cancel text-decoration-underline"
                      onClick={() => {
                        setValue(defaultState);
                        handleclose();
                        simpleValidator.current.hideMessages();
                        forceUpdate();
                      }}
                    >
                      Cancel
                    </Link>
                    <SubmitButton
                      type="submit"
                      className="btn blue-btn"
                      name={action === "add" ? "Submit" : "Update"}
                      disabled={loader}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddEditMaterial;
