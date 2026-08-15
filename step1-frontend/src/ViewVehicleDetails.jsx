import React, { useEffect, useState } from "react";

const API_BASE_URL =
  "http://localhost:8080/api/vehicle-owners/vehicles";

export default function ViewVehicleDetails({
  vehicle,
  onBack,
  onBookVehicle,
  onViewProfile,
  showFooter = true,
}) {

  const [vehicleData, setVehicleData] =
    useState(vehicle);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // =========================================================
  // GET COMPLETE VEHICLE
  // =========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [vehicle?.id]);

  useEffect(() => {

    const loadVehicle = async () => {

      if (!vehicle?.id) {
        return;
      }


      try {

        setLoading(true);

        setError("");


        const response =
          await fetch(
            `${API_BASE_URL}/catalog/${vehicle.id}`
          );


        if (!response.ok) {

          throw new Error(
            `HTTP error: ${response.status}`
          );
        }


        const result =
          await response.json();


        if (
          result.success === false
        ) {

          throw new Error(
            result.message ||
            "Unable to load vehicle."
          );
        }


        if (result.data) {

          setVehicleData(
            result.data
          );
        }

      } catch (err) {

        console.error(
          "Vehicle details error:",
          err
        );

        setError(
          err.message ||
          "Unable to load vehicle details."
        );

      } finally {

        setLoading(false);
      }
    };


    loadVehicle();

  }, [vehicle?.id]);


  if (!vehicleData) {

    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Vehicle not selected.
      </div>
    );
  }


  // =========================================================
  // HELPERS
  // =========================================================

  const formatPrice = (
    amount
  ) => {

    if (
      amount === null ||
      amount === undefined
    ) {

      return "Not available";
    }


    return `₹${Number(
      amount
    ).toLocaleString("en-IN")}`;
  };

  const handleViewDocument = (
    document
  ) => {
    if (!document?.fileData) {
      return;
    }

    try {
      const cleanedBase64 =
        document.fileData.replace(
          /\s/g,
          ""
        );

      const binaryString = atob(
        cleanedBase64
      );
      const bytes = new Uint8Array(
        binaryString.length
      );

      for (
        let index = 0;
        index < binaryString.length;
        index += 1
      ) {
        bytes[index] =
          binaryString.charCodeAt(
            index
          );
      }

      const blob = new Blob(
        [bytes],
        {
          type:
            document.contentType ||
            "application/octet-stream",
        }
      );

      const objectUrl =
        URL.createObjectURL(blob);

      window.open(
        objectUrl,
        "_blank",
        "noopener,noreferrer"
      );

      window.setTimeout(() => {
        URL.revokeObjectURL(
          objectUrl
        );
      }, 10000);
    } catch (err) {
      console.error(
        "Unable to open document:",
        err
      );
      alert(
        "Unable to open this document. Please try again."
      );
    }
  };


  const imageFromMedia = (
    media
  ) => {

    if (
      media?.fileData &&
      media?.contentType
    ) {

      return `data:${media.contentType};base64,${media.fileData}`;
    }


    return null;
  };


  const imageList =
    Array.isArray(
      vehicleData.media
    )
      ? vehicleData.media.filter(
          (media) =>
            media?.contentType
              ?.toLowerCase()
              .startsWith("image/")
        )
      : [];


  const videoList =
    Array.isArray(
      vehicleData.media
    )
      ? vehicleData.media.filter(
          (media) =>
            media?.contentType
              ?.toLowerCase()
              .startsWith("video/")
        )
      : [];


  return (
    <div
      style={{
        padding: "1px",
        background: "#f4f7fb",
        minHeight: "100vh",
        // marginTop:"30px",
      }}
    >

      {/* =====================================================
          TOP ACTIONS
      ===================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "24px",
          marginTop: "60px"
        }}
      >

        <button
          type="button"
          onClick={onBack}
          style={styles.backButton}
        >
          ← Back to Vehicles
        </button>

        <button
          type="button"
          onClick={() =>
            onBookVehicle?.(
              vehicleData
            )
          }
          style={styles.bookButton}
        >
          Book Now
        </button>

      </div>


      {loading && (

        <div
          style={{
            padding: "15px",
            background: "#eff6ff",
            color: "#1d4ed8",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          Loading complete vehicle details...
        </div>

      )}


      {error && (

        <div
          style={{
            padding: "15px",
            background: "#fef2f2",
            color: "#b91c1c",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>

      )}


      {/* =====================================================
          VEHICLE HEADER
      ===================================================== */}

      <section
        style={styles.card}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(300px, 1fr) minmax(300px, 1.2fr)",
            gap: "30px",
          }}
        >

          {/* FRONT IMAGE */}

          <div>

            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                background:
                  "#e5e7eb",
                height: "360px",
              }}
            >

              {vehicleData.frontImage ? (

                <img
                  src={
                    vehicleData.frontImage
                  }
                  alt={
                    vehicleData.vehicleName
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit:
                      "cover",
                  }}
                />

              ) : (

                <div
                  style={{
                    height: "100%",
                    display: "grid",
                    placeItems:
                      "center",
                    color:
                      "#64748b",
                  }}
                >
                  No front image available
                </div>

              )}

            </div>

          </div>


          {/* BASIC INFORMATION */}

          <div>

            <span
              style={
                styles.typeBadge
              }
            >
              {
                vehicleData.vehicleType ||
                "Vehicle"
              }
            </span>


            <h1
              style={{
                margin:
                  "14px 0 8px",
                fontSize: "32px",
                color:
                  "#102a43",
              }}
            >
              {
                vehicleData.vehicleName
              }
            </h1>


            <p
              style={{
                margin: "0 0 20px",
                color:
                  "#64748b",
                fontSize:
                  "16px",
              }}
            >
              {
                vehicleData.brand
              }{" "}
              {
                vehicleData.model
              }
            </p>

            

            <div
              style={
                styles.priceGrid
              }
            >

              <div
                style={
                  styles.priceBox
                }
              >

                <span>
                  Per Hour
                </span>

                <strong>
                  {
                    formatPrice(
                      vehicleData.hourlyRent
                    )
                  }
                </strong>

              </div>


              <div
                style={
                  styles.priceBox
                }
              >

                <span>
                  Per Day
                </span>

                <strong>
                  {
                    formatPrice(
                      vehicleData.dailyRent
                    )
                  }
                </strong>

              </div>


              <div
                style={
                  styles.priceBox
                }
              >

                <span>
                  Per Week
                </span>

                <strong>
                  {
                    formatPrice(
                      vehicleData.weeklyRent
                    )
                  }
                </strong>

              </div>


              <div
                style={
                  styles.priceBox
                }
              >

                <span>
                  Per Month
                </span>

                <strong>
                  {
                    formatPrice(
                      vehicleData.monthlyRent
                    )
                  }
                </strong>

              </div>
              <button
              type="button"
              onClick={() =>
                onBookVehicle?.(
                  vehicleData
                )
              }
              style={{
                ...styles.bookButton,
                marginBottom:
                  "20px",
                width:
                  "100%",

                marginLeft:"160px",
              }}
            >
              Book Now
            </button>
              
            </div>
            

          </div>

        </div>

      </section>


      {/* =====================================================
          VEHICLE DESCRIPTION, INFORMATION & FEATURES
      ===================================================== */}

      <section
        style={styles.card}
      >

        <h2
          style={
            styles.sectionTitle
          }
        >
          Vehicle Description
        </h2>

        <p
          style={{
            color: "#475569",
            lineHeight: 1.8,
            margin: "0 0 28px",
          }}
        >
          {
            vehicleData.description ||
            "No description provided by the vehicle owner."
          }
        </p>

        <h2
          style={{
            ...styles.sectionTitle,
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          Vehicle Information
        </h2>

        <div
          style={
            styles.infoGrid
          }
        >

          <Info
            label="Vehicle Name"
            value={
              vehicleData.vehicleName
            }
          />

          <Info
            label="Vehicle Type"
            value={
              vehicleData.vehicleType
            }
          />

          <Info
            label="Brand"
            value={
              vehicleData.brand
            }
          />

          <Info
            label="Model"
            value={
              vehicleData.model
            }
          />

          <Info
            label="Manufacturing Year"
            value={
              vehicleData.manufacturingYear
            }
          />

          <Info
            label="Vehicle Number"
            value={
              vehicleData.vehicleNo
            }
          />

          <Info
            label="Fuel Type"
            value={
              vehicleData.fuelType
            }
          />

          <Info
            label="Transmission"
            value={
              vehicleData.transmission
            }
          />

          <Info
            label="Engine Capacity"
            value={
              vehicleData.engineCapacity
            }
          />

          <Info
            label="Color"
            value={
              vehicleData.color
            }
          />

          <Info
            label="Seating Capacity"
            value={
              vehicleData.seatingCapacity
            }
          />

          <Info
            label="Mileage"
            value={
              vehicleData.mileage
                ? `${vehicleData.mileage} km/l`
                : "-"
            }
          />

        </div>

        <h2
          style={{
            ...styles.sectionTitle,
            marginTop: "28px",
            marginBottom: "20px",
          }}
        >
          Vehicle Features
        </h2>

        {vehicleData.features?.length >
        0 ? (

          <div
            style={
              styles.featureGrid
            }
          >

            {vehicleData.features.map(
              (feature) => (

                <div
                  key={
                    feature.id
                  }
                  style={
                    styles.featureItem
                  }
                >
                  ✓{" "}
                  {
                    feature.featureName
                  }
                </div>

              )
            )}

          </div>

        ) : (

          <p
            style={{
              color:
                "#64748b",
            }}
          >
            No features available.
          </p>

        )}

      </section>


      {/* =====================================================
          PHOTOS & VIDEOS
      ===================================================== */}

      {(imageList.length > 0 || videoList.length > 0) && (

        <section
          style={styles.card}
        >

          <h2
            style={
              styles.sectionTitle
            }
          >
            Vehicle Photos & Videos
          </h2>


          <div
            style={
              styles.horizontalMediaScroll
            }
          >

            <div
              style={
                styles.horizontalMediaRow
              }
            >

              {imageList.map(
                (media) => (

                  <div
                    key={
                      media.id
                    }
                    style={
                      styles.mediaCard
                    }
                  >

                    <img
                      src={
                        imageFromMedia(
                          media
                        )
                      }
                      alt={
                        media.fileName ||
                        "Vehicle"
                      }
                      style={{
                        width:
                          "100%",
                        height:
                          "240px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "14px",
                      }}
                    />


                    <div
                      style={{
                        padding:
                          "8px",
                      }}
                    >
                      {
                        media.mediaCategory ||
                        "Vehicle Image"
                      }
                    </div>

                  </div>

                )
              )}

              {videoList.map(
                (media) => (

                  <div
                    key={
                      media.id
                    }
                    style={
                      styles.mediaCard
                    }
                  >

                    <video
                      controls
                      style={{
                        width:
                          "100%",
                        height:
                          "240px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "14px",
                        background:
                          "#0f172a",
                      }}
                    >

                      <source
                        src={
                          imageFromMedia(
                            media
                          )
                        }
                        type={
                          media.contentType
                        }
                      />

                    </video>


                    <div
                      style={{
                        padding:
                          "8px",
                      }}
                    >
                      {
                        media.fileName
                      }
                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}

      {imageList.length === 0 && videoList.length === 0 && (

        <section
          style={styles.card}
        >

          <h2
            style={
              styles.sectionTitle
            }
          >
            Vehicle Photos & Videos
          </h2>

          <p
            style={{
              color:
                "#64748b",
            }}
          >
            No vehicle photos or videos available.
          </p>

        </section>

      )}


      {/* =====================================================
          PRICING
      ===================================================== */}

      <section
        style={styles.card}
      >

        <h2
          style={
            styles.sectionTitle
          }
        >
          Rent & Charges
        </h2>


        <div
          style={
            styles.infoGrid
          }
        >

          <Info
            label="Hourly Rent"
            value={
              formatPrice(
                vehicleData.hourlyRent
              )
            }
          />

          <Info
            label="Daily Rent"
            value={
              formatPrice(
                vehicleData.dailyRent
              )
            }
          />

          <Info
            label="Weekly Rent"
            value={
              formatPrice(
                vehicleData.weeklyRent
              )
            }
          />

          <Info
            label="Monthly Rent"
            value={
              formatPrice(
                vehicleData.monthlyRent
              )
            }
          />

          <Info
            label="Security Deposit"
            value={
              formatPrice(
                vehicleData.securityDeposit
              )
            }
          />

          <Info
            label="Cleaning Charges"
            value={
              formatPrice(
                vehicleData.cleaningCharges
              )
            }
          />

          <Info
            label="Late Return Charges"
            value={
              formatPrice(
                vehicleData.lateReturnCharges
              )
            }
          />

          <Info
            label="Cancellation Charges"
            value={
              formatPrice(
                vehicleData.cancellationCharges
              )
            }
          />

          <Info
            label="Driver Charges"
            value={
              vehicleData.enableDriverCharges
                ? formatPrice(
                    vehicleData.driverCharges
                  )
                : "Not enabled"
            }
          />

          <Info
            label="Home Delivery"
            value={
              vehicleData.enableHomeDeliveryCharges
                ? formatPrice(
                    vehicleData.homeDeliveryCharges
                  )
                : "Not enabled"
            }
          />

        </div>

      </section>


      {/* =====================================================
          DOCUMENTS
      ===================================================== */}

      <section
        style={styles.card}
      >

        <h2
          style={
            styles.sectionTitle
          }
        >
          Vehicle Documents
        </h2>


        {vehicleData.documents?.length >
        0 ? (

          <div
            style={{
              display:
                "grid",
              gap:
                "12px",
            }}
          >

            {vehicleData.documents.map(
              (document) => (

                <div
                  key={
                    document.id
                  }
                  style={
                    styles.documentRow
                  }
                >

                  <div>

                    <strong>
                      {
                        document.documentType
                      }
                    </strong>

                    <div
                      style={{
                        color:
                          "#64748b",
                        fontSize:
                          "13px",
                        marginTop:
                          "4px",
                      }}
                    >
                      {
                        document.fileName
                      }
                    </div>

                  </div>


                  {document.fileData && (

                    <button
                      type="button"
                      onClick={() =>
                        handleViewDocument(
                          document
                        )
                      }
                      style={
                        styles.documentButton
                      }
                    >
                      View Document
                    </button>

                  )}

                </div>

              )
            )}

          </div>

        ) : (

          <p
            style={{
              color:
                "#64748b",
            }}
          >
            No documents available.
          </p>

        )}

      </section>


      {/* =====================================================
          BOOK NOW
      ===================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          margin:
            "30px 0",
        }}
      >

        <button
          type="button"
          onClick={() =>
            onBookVehicle?.(
              vehicleData
            )
          }
          style={{
            ...styles.bookButton,
            padding:
              "14px 40px",
            fontSize:
              "16px",
          }}
        >
          Book This Vehicle
        </button>

      </div>


      {showFooter && (

        <footer
          style={{
            marginTop:
              "30px",
            padding:
              "30px",
            background:
              "#0c1726",
            color:
              "#fff",
            borderRadius:
              "20px",
          }}
        >
          VehicleHub © 2026
        </footer>

      )}

    </div>
  );
}


// ===========================================================
// INFO COMPONENT
// ===========================================================

function Info({
  label,
  value,
}) {

  return (
    <div
      style={
        styles.infoItem
      }
    >

      <span
        style={
          styles.infoLabel
        }
      >
        {label}
      </span>

      <strong
        style={
          styles.infoValue
        }
      >
        {value ||
          "-"}
      </strong>

    </div>
  );
}


// ===========================================================
// STYLES
// ===========================================================

const styles = {

  card: {
    background:
      "#ffffff",
    borderRadius:
      "0px",
    padding:
      "28px",
    marginBottom:
      "0px",
    boxShadow:
      "0 15px 35px rgba(15, 23, 42, 0.06)",
  },

  backButton: {
    border:
      "1px solid #d1d5db",
    background:
      "#ffffff",
    padding:
      "11px 18px",
    borderRadius:
      "12px",
    cursor:
      "pointer",
    fontWeight:
      600,
  
  },

  bookButton: {
    border:
      "none",
    background:
      "#0f7a34",
    color:
      "#ffffff",
    padding:
      "11px 22px",
    borderRadius:
      "12px",
    cursor:
      "pointer",
    fontWeight:
      700,
  },

  typeBadge: {
    display:
      "inline-block",
    padding:
      "7px 12px",
    background:
      "#dcfce7",
    color:
      "#166534",
    borderRadius:
      "999px",
    fontWeight:
      700,
    fontSize:
      "13px",
  },

  priceGrid: {
    display:
      "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap:
      "12px",
  },

  priceBox: {
    background:
      "#f8fafc",
    border:
      "1px solid #e5e7eb",
    padding:
      "15px",
    borderRadius:
      "14px",
    display:
      "grid",
    gap:
      "6px",
  },

  infoGrid: {
    display:
      "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap:
      "15px",
  },

  infoItem: {
    background:
      "#f8fafc",
    borderRadius:
      "14px",
    padding:
      "15px",
    display:
      "grid",
    gap:
      "7px",
  },

  infoLabel: {
    color:
      "#64748b",
    fontSize:
      "13px",
  },

  infoValue: {
    color:
      "#102a43",
  },

  sectionTitle: {
    margin:
      "0 0 20px",
    color:
      "#102a43",
  },

  featureGrid: {
    display:
      "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap:
      "12px",
  },

  featureItem: {
    background:
      "#ecfdf5",
    color:
      "#166534",
    padding:
      "13px 15px",
    borderRadius:
      "12px",
    fontWeight:
      600,
  },

  horizontalMediaScroll: {
    overflowX:
      "auto",
    overflowY:
      "hidden",
    paddingBottom:
      "6px",
    scrollbarWidth:
      "thin",
  },

  horizontalMediaRow: {
    display:
      "flex",
    gap:
      "18px",
    minWidth:
      "max-content",
    alignItems:
      "stretch",
  },

  mediaGrid: {
    display:
      "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap:
      "18px",
  },

  mediaCard: {
    background:
      "#f8fafc",
    borderRadius:
      "14px",
    overflow:
      "hidden",
    border:
      "1px solid #e5e7eb",
    minWidth:
      "300px",
    width:
      "300px",
    flexShrink:
      0,
  },

  documentRow: {
    display:
      "flex",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    gap:
      "20px",
    background:
      "#f8fafc",
    padding:
      "15px",
    borderRadius:
      "14px",
  },

  documentButton: {
    background:
      "#0f7a34",
    color:
      "#ffffff",
    padding:
      "9px 14px",
    borderRadius:
      "10px",
    textDecoration:
      "none",
    fontWeight:
      600,
  },
};