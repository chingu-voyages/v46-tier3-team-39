"use client";
import { Container } from "../server/containerBar";
import { Button, Chip, IconButton, Menu } from "@mui/material";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Share } from "@mui/icons-material";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { parseInteger } from "@/app/util/parsers/parseInt";
import { Carousel } from "@/app/util/components/carousel/carousel";
import { MouseEvent, useRef, useState } from "react";
import useOrigin from "@/app/util/hooks/useOrigin";
import {
  faFacebook,
  faLinkedin,
  faReddit,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import useDropdown from "@/app/util/hooks/useDropdown";
import useElementPosition from "@/app/util/hooks/useElementSize";
const platformsToShare = [
  {
    platform: "link",
    icon: <FontAwesomeIcon icon={faLink} className="h-[0.8004em]" />,
  },
  { platform: "facebook", icon: <FontAwesomeIcon icon={faFacebook} /> },
  { platform: "twitter", icon: <FontAwesomeIcon icon={faTwitter} /> },
  { platform: "linkedin", icon: <FontAwesomeIcon icon={faLinkedin} /> },
  { platform: "reddit", icon: <FontAwesomeIcon icon={faReddit} /> },
  { platform: "whatsapp", icon: <FontAwesomeIcon icon={faWhatsapp} /> },
] as const;
const determineShareUrl = (url: string, platform?: string) => {
  // Set the URL to share based on the social media platform
  let shareUrl;
  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?&url=${encodeURIComponent(
        url
      )}`;
      break;
    case "reddit":
      shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}`;
      break;
    case "whatsapp":
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        url
      )}`;
      break;
    default:
      shareUrl = url;
  }
  return shareUrl;
};
const ShareBtn = () => {
  const origin = useOrigin();
  const pathName = usePathname();
  const { anchorEl: shareBtnEl, handleClick, handleClose } = useDropdown();
  const [copied, setCopied] = useState(false);
  const fullUrl = origin + pathName;
  const onShareClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const target = e.currentTarget as HTMLButtonElement;
    // Get the social media platform from the data list
    const dataset = target.dataset;
    const platform = dataset["platformId"];
    // Get the URL of the current page
    const shareUrl = determineShareUrl(fullUrl, platform);
    console.log(shareUrl)
    if (platform !== "link") window.open(shareUrl, "_blank");
    //when user wants to only copy url/link
    else navigator.clipboard.writeText(shareUrl).then(() => setCopied(true));
  };
  return (
    <>
      <IconButton
        className="h-[70%]"
        type="button"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <Share className="text-lg" />
      </IconButton>
      <Menu
        anchorEl={shareBtnEl}
        open={Boolean(shareBtnEl)}
        onClose={() => handleClose()}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        MenuListProps={{
          className: "w-36 sm:w-auto",
          disablePadding: true,
        }}
        slotProps={{
          paper: {
            sx: { minHeight: "unset" },
          },
        }}
        sx={{
          minHeight: "unset",
        }}
      >
        <div className="flex flex-wrap justify-center px-4 py-0">
          {platformsToShare.map((platform) => (
            <IconButton
              className="h-[50%] text-lg aspect-square my-2"
              type="button"
              key={platform.platform}
              onClick={onShareClick}
              aria-label={`Share on ${platform.platform}`}
              data-platform-id={platform.platform }
            >
              {platform.icon}
            </IconButton>
          ))}
        </div>
      </Menu>
    </>
  );
};
const QuestionActionBtns = () => {
  return (
    <div className="flex items-center space-x-1">
      {/* this is for when a user can add the question to quiz */}
      {/* <IconButton className="h-[70%]" type="button">
        <FontAwesomeIcon icon={faPlus} className="text-lg" />
      </IconButton> */}
      <ShareBtn />
    </div>
  );
};
const LikeCounterBtns = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  return (
    <div className="flex items-center mr-1">
      <Button
        className="space-x-1"
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
      >
        <FontAwesomeIcon icon={faThumbsUp} className="text-lg" />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.likes)}
        </span>
      </Button>
      <Button
        className="space-x-1"
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
      >
        <FontAwesomeIcon
          icon={faThumbsDown}
          style={{ transform: "scale(-1, 1)" }}
          className="text-lg"
        />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.dislikes)}
        </span>
      </Button>
    </div>
  );
};
export const QuestionView = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;

  if (!question) return <></>;
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {question.questionInfo && (
        <h2 className="text-3xl font-semibold mb-1 flex align-center">
          {question.questionInfo.title}
        </h2>
      )}
      <div className="flex items-center w-full mb-2">
        <LikeCounterBtns />
        <QuestionActionBtns />
      </div>
      {question.tags && (
        <div className="flex w-full mb-5">
          <Carousel>
            {question.tags.map((tag, idx) => (
              <Chip
                key={tag + idx}
                label={tag.toLowerCase()}
                size="small"
                className="mr-3 my-1 text-xs h-auto py-0.5"
                sx={{
                  minHeight: "unset",
                }}
              />
            ))}
          </Carousel>
        </div>
      )}

      {question.questionInfo && (
        <p className="text-sm pb-5">{question.questionInfo.description}</p>
      )}
    </Container>
  );
};
