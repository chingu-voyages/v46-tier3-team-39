"use client";
import { Container } from "../../page/server/containerBar";
import {
  Button,
  Chip,
  IconButton,
  Menu,
  MenuProps,
  Typography,
} from "@mui/material";
import { useQuestions } from "@/app/stores/questionStore";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Share from "@mui/icons-material/Share";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons/faThumbsDown";
import { parseInteger } from "@/app/util/parsers/parseInt";
import { Carousel } from "@/app/util/components/carousel/carousel";
import { MouseEvent, useState, useTransition } from "react";
import useOrigin from "@/app/util/hooks/useOrigin";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import useDropdown from "@/app/util/hooks/useDropdown";
import BtnLabelDropdown from "@/app/util/components/btnLabelDropdown/btnLabelDropdown";
import { useQuestionId } from "../../../context/QuestionIdContext";
import { useSession } from "next-auth/react";
import { performLikeAction } from "../server/actions";
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
  const {
    anchorEl: shareBtnEl,
    setAnchorEl,
    handleClick,
    handleClose,
    open,
  } = useDropdown();
  const [copied, setCopied] = useState(false);

  const fullUrl = origin && pathName ? origin + pathName : "";
  const onShareClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const target = e.currentTarget as HTMLButtonElement;
    // Get the social media platform from the data list
    const dataset = target.dataset;
    const platform = dataset["platformId"];
    // Get the URL of the current page
    const shareUrl = determineShareUrl(fullUrl, platform);
    if (platform !== "link") window.open(shareUrl, "_blank");
    //when user wants to only copy url/link
    else navigator.clipboard.writeText(shareUrl).then(() => setCopied(true));
    handleClose();
  };
  const shareMenuProps: Omit<MenuProps, "open"> = {
    anchorEl: shareBtnEl,
    onClose: () => {
      setCopied(false);
      handleClose();
    },
    anchorOrigin: {
      horizontal: "center",
      vertical: "bottom",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    MenuListProps: {
      disablePadding: true,
    },
    slotProps: {
      paper: {
        sx: { minHeight: "unset" },
      },
    },
    sx: {
      minHeight: "unset",
    },
  };
  return (
    <>
      <BtnLabelDropdown text="Share" pointerEvents={false}>
        {(props) => (
          <IconButton
            ref={(ref) => {
              setAnchorEl(ref);
              props.setAnchorEl(ref);
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") props.handleClick(e);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") props.handleClose();
            }}
            className="h-[70%]"
            type="button"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <Share className="text-lg" />
          </IconButton>
        )}
      </BtnLabelDropdown>
      <Menu {...shareMenuProps} open={copied}>
        <div className="flex px-3 py-1 justify-center items-center space-x-2">
          <FontAwesomeIcon icon={faCheck} className="text-xs" />{" "}
          <Typography className="text-xs">Link Copied!</Typography>
        </div>
      </Menu>
      <Menu
        {...shareMenuProps}
        open={open}
        MenuListProps={{
          className: "w-36 sm:w-auto",
          disablePadding: true,
        }}
      >
        <div className="flex flex-wrap justify-center px-2 py-0">
          {platformsToShare.map((platform) => {
            const onClick =
              platform.platform === "link"
                ? (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
                    onShareClick(e);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 5000);
                  }
                : onShareClick;
            return (
              <IconButton
                className="w-8 h-8 text-lg my-2"
                type="button"
                key={platform.platform}
                onClick={onClick}
                aria-label={`Share on ${platform.platform}`}
                data-platform-id={platform.platform}
              >
                {platform.icon}
              </IconButton>
            );
          })}
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
  const [questionData, { addOrUpdateItems }] = useQuestions();
  const questions = questionData?.data;
  const questionIdData = useQuestionId();
  const [isPending, startTransition] = useTransition();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  const session = useSession();
  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (isPending) return;
    const target = e.currentTarget;
    const dataset = target.dataset;
    const type = dataset["likeBtnType"];
    const actionType = type === "like" ? "like" : "dislike";
    startTransition(async () => {
      if (!questionId || isPending) return;
      const result = await performLikeAction(actionType, questionId);
      if (!result) return;
      addOrUpdateItems([
        {
          id: questionId,
          likeCounter: result,
        },
      ]);
    });
  };
  return (
    <div className="flex items-center mr-1">
      <Button
        className="space-x-1"
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
        data-like-btn-type={"like"}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faThumbsUp} className="text-lg" />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.likes)}
        </span>
      </Button>
      <Button
        data-like-btn-type={"dislike"}
        className="space-x-1"
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
        onClick={handleClick}
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
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;

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
