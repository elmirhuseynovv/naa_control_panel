import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePosts } from "@/hooks/UsePosts";
import type { TableElementProps } from "@/types/types";
import IconClose from "@/assets/close.svg";
import IconGallery from "@/assets/gallery.svg";
import IconNews from "@/assets/news.svg";
import IconAnnoucement from "@/assets/announcement.svg";
import "./CreateNewsModal.scss";
import clsx from "clsx";
import If from "../If";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  author: z.string().min(2, "Author name is required"),
  contentType: z.enum(["News", "Announcement"]),
});

type PostFormData = z.infer<typeof postSchema>;

interface CreateNewsModalProps {
  onClose: () => void;
  mode?: "create" | "edit";
  post?: TableElementProps | null;
}

const CreateNewsModal: React.FC<CreateNewsModalProps> = ({
  onClose,
  mode = "create",
  post = null,
}) => {
  const { addPost, updatePost } = usePosts();
  const [step, setStep] = useState<1 | 2>(1);
  const [cover, setCover] = useState<string | null>(post?.image ?? null);
  const [category, setCategory] = useState<"News" | "Announcement">(
    (post?.contentType as "News" | "Announcement") || "News"
  );
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [language, setLanguage] = useState<"AZ" | "EN">("AZ");
  const [imageError, setImageError] = useState<string>("");

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: post?.title ?? "",
      description: post?.description ?? "",
      contentType: (post?.contentType as "News" | "Announcement") ?? "News",
      author: post?.author ?? "ehuseynov",
    },
  });

  useEffect(() => {
    if (mode === "edit" && post) {
      reset({
        title: post.title,
        description: post.description,
        author: post.author,
        contentType: post.contentType as "News" | "Announcement",
      });
      setCover(post.image);
      setCategory(post.contentType as "News" | "Announcement");
    }
  }, [mode, post, reset]);

  const handleExtraImages = (files: FileList | null) => {
    if (!files) return;
    const newImgs = Array.from(files).map((f) => URL.createObjectURL(f));
    setExtraImages((prev) => [...prev, ...newImgs]);
  };

  const onSubmit = (formData: PostFormData) => {
    if (!cover) {
      setImageError("Please upload a cover image");
      return;
    }

    const postData: TableElementProps = {
      ...formData,
      id: post?.id ?? Date.now().toString(),
      image: cover,
      contentType: category,
      date: post?.date ?? new Date().toLocaleDateString(),
      time:
        post?.time ??
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      status: post?.status ?? "Active",
      author: formData.author || "ehuseynov",
    };

    mode === "edit" ? updatePost.mutate(postData) : addPost.mutate(postData);
    onClose();
    reset();
  };

  const handleNext = async () => {
    const isValid = await trigger(["title", "description"]);

    if (!cover) {
      setImageError("Please upload a cover image");
      return;
    } else {
      setImageError("");
    }

    if (isValid) setStep(2);
  };

  return (
    <div className="CreateNewsModal">
      <div className="ModalContent">
        <button className="CloseButton" onClick={onClose}>
          <img src={IconClose} alt="Close" className="IconClose" />
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
                <img src={lng.flag} alt={lng.code} className="FlagIcon" />
                {lng.code}
              </button>
            ))}
          </div>

          <div className="NewsAnnouncement">
            <div className="NewsAnnouncementHeading">
              <h2 className="ModalTitle">
                {mode === "edit" ? "Edit Post" : "Create News / Announcement"}
              </h2>
              <div className="StepIndicator">{step}/2</div>
            </div>
            <div className="Lines">
              <div className={clsx("Line", step >= 1 && "Active")}></div>
              <div className={clsx("Line", step === 2 && "Active")}></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <If state={step === 1}>
            <div className="FormGroup">
              <div className="FormField">
                <label className="Label">Title</label>
                <input
                  type="text"
                  className="Input"
                  placeholder="Enter title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="Error">{errors.title.message}</p>
                )}
              </div>

              <div className="FormField">
                <label className="Label">Description</label>
                <textarea
                  className="TextArea"
                  placeholder="Enter description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="Error">{errors.description.message}</p>
                )}
              </div>

              <div className="FormField">
                <label className="Label">Category</label>
                <div className="CategorySwitch">
                  {[
                    { name: "News", icon: IconNews },
                    { name: "Announcement", icon: IconAnnoucement },
                  ].map((item) => (
                    <button
                      type="button"
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
                          setImageError("");
                        }
                      }}
                    />
                  </label>
                ) : (
                  <div className="CoverPreview">
                    <img src={cover} alt="cover" className="CoverImage" />
                    <div className="CoverInfo">
                      <p>Photo name</p>
                      <button type="button" onClick={() => setCover(null)}>
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {imageError && <p className="Error">{imageError}</p>}
              </div>
            </div>
          </If>

          <If state={step === 2}>
            <div className="FormGroup">
              <p className="Label">Upload Additional Images</p>
              <label className="BigUploadBox">
                <img src={IconGallery} alt="" />
                <span>Click to upload multiple images</span>
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
              <button type="button" className="NextButton" onClick={handleNext}>
                Next
              </button>
            ) : (
              <div className="DoubleButtons">
                <button
                  type="button"
                  className="BackButton"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button type="submit" className="SubmitButton">
                  {mode === "edit" ? "Update" : "Submit"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsModal;
