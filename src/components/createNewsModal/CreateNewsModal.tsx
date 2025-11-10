import React, { useState } from "react";
import IconClose from "@/assets/close.svg";
import IconGallery from "@/assets/gallery.svg";
import IconNews from "@/assets/news.svg";
import IconAnnoucement from "@/assets/announcement.svg";
import "./CreateNewsModal.scss";
import clsx from "clsx";
import If from "../If";

interface CreateNewsModalProps {
  onClose: () => void;
}

const CreateNewsModal: React.FC<CreateNewsModalProps> = ({ onClose }) => {
  const [language, setLanguage] = useState<"AZ" | "EN">("AZ");
  const [category, setCategory] = useState<"News" | "Announcement">("News");
  const [cover, setCover] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [extraImages, setExtraImages] = useState<string[]>([]);

  const handleExtraImages = (files: FileList | null) => {
    if (!files) return;
    const newImgs = Array.from(files).map((f) => URL.createObjectURL(f));
    setExtraImages((prev) => [...prev, ...newImgs]);
  };

  return (
    <div className="CreateNewsModal">
      <div className="ModalContent">
        <button className="CloseButton" onClick={onClose}>
          <img src={IconClose} alt="" className="IconClose" />
        </button>

        <div className="ModalTop">
          <div className="LanguageSwitch">
            {[
              {
                code: "AZ",
                flag: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg",
              },
              {
                code: "EN",
                flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1024px-Flag_of_the_United_Kingdom_%283-5%29.svg.png",
              },
            ].map((lng) => (
              <button
                key={lng.code}
                className={`LanguageButton ${
                  language === lng.code ? "Active" : ""
                }`}
                onClick={() => setLanguage(lng.code as "AZ" | "EN")}
              >
                <img
                  src={lng.flag}
                  alt={lng.code}
                  className="FlagIcon"
                  loading="lazy"
                />
                {lng.code}
              </button>
            ))}
          </div>

          <div className="NewsAnnouncement">
            <div className="NewsAnnouncementHeading">
              <h2 className="ModalTitle">Create News / Announcement</h2>
              <div className="StepIndicator">{step}/2</div>
            </div>

            <div className="Lines">
              <div className={clsx("Line", step >= 1 && "Active")}></div>
              <div className={clsx("Line", step === 2 && "Active")}></div>
            </div>
          </div>
        </div>

        <If state={step === 1}>
          <div className="FormGroup">
            <div className="FormField">
              <label className="Label">Title</label>
              <input
                type="text"
                placeholder="Milli Aviasiya Akademiyasının təşkilatçılığı ilə hazırlanan..."
                className="Input"
              />
            </div>

            <div className="FormField">
              <label className="Label">URL</label>
              <input type="text" placeholder="naa.edu.az/" className="Input" />
            </div>

            <div className="FormField">
              <label className="Label">Category</label>
              <div className="CategorySwitch">
                {[
                  { name: "News", icon: IconNews },
                  { name: "Announcement", icon: IconAnnoucement },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`CategoryButton ${
                      category === item.name ? "Active" : ""
                    }`}
                    onClick={() =>
                      setCategory(item.name as "News" | "Announcement")
                    }
                  >
                    <img src={item.icon} alt={item.icon} className="Icons" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="FormField">
              <label className="Label">Cover Image</label>
              {!cover ? (
                <label className="UploadBox">
                  <img src={IconGallery} alt="" />
                  <span>Upload Cover Image</span>
                  <input
                    type="file"
                    className="HiddenInput"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setCover(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </label>
              ) : (
                <div className="CoverPreview">
                  <img src={cover} alt="cover" className="CoverImage" />
                  <div className="CoverInfo">
                    <p>Photo name</p>
                    <button onClick={() => setCover(null)}>Remove</button>
                  </div>
                </div>
              )}
            </div>

            <div className="FormField">
              <label className="Label">HTML Content</label>
              <textarea
                placeholder="Use the toolbar to format your text..."
                className="TextArea"
              />
            </div>
          </div>
        </If>

        <If state={step === 2}>
          <div className="FormGroup">
            {cover && (
              <div className="FormField">
                <label className="Label">Cover Image</label>
                <div className="CoverPreview">
                  <img src={cover} alt="cover" className="CoverImage" />
                  <div className="CoverInfo">
                    <p>Photo name</p>
                    <button onClick={() => setCover(null)}>Remove</button>
                  </div>
                </div>
              </div>
            )}

            <p className="Label">Upload Additional Images</p>
            <label className="BigUploadBox">
              <img src={IconGallery} alt="" />
              <span>Drop or click to upload multiple images</span>
              <input
                type="file"
                multiple
                className="HiddenInput"
                onChange={(e) => handleExtraImages(e.target.files)}
              />
            </label>

            <If state={extraImages.length > 0}>
              <div className="PreviewGrid">
                {extraImages.map((src, i) => (
                  <img key={i} src={src} alt={`extra-${i}`} />
                ))}
              </div>
            </If>
          </div>
        </If>

        <div className="ButtonContainer">
          {step === 1 ? (
            <button className="NextButton" onClick={() => setStep(2)}>
              Next
            </button>
          ) : (
            <div className="DoubleButtons">
              <button className="BackButton" onClick={() => setStep(1)}>
                Back
              </button>
              <button
                className="SubmitButton"
                onClick={() => alert("Form submitted!")}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNewsModal;
