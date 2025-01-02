"use client";

import {
  Card,
  CardHeader,
  CardMedia,
  Divider,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";

import { MouseEventHandler, MouseEvent, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import CopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from "next/link";

import Hero from "@/app/models/hero";

import Image from "next/image";
import { usePathname } from "next/navigation";
import createNewHero from "./create-new-hero";
import deleteHero from "./delete-hero";

interface HeroCardProps {
  hero: Hero;
}

interface FieldProps {
  label: string;
  value: string | undefined;
  defaultValue?: string;
}

function Field(props: FieldProps) {
  return (
    <Box marginY={1}>
      <Typography
        paddingInlineEnd={1}
        fontWeight="bold"
        component="span"
        variant="body1"
      >
        {props.label}
      </Typography>
      <Typography component="span" variant="body1">
        {props.value
          ? props.value
          : props.defaultValue
          ? props.defaultValue
          : "None"}
      </Typography>
    </Box>
  );
}

async function deleteHeroAction(
  userId: number,
  heroId: number,
  pathName: string,
  callback: () => void
): Promise<boolean> {
  const success: boolean = await deleteHero(userId, heroId, pathName);
  callback();
  return success;
}

async function createNewHeroAction(
  heroRequest: Hero,
  pathName: string,
  callback: () => void
): Promise<void> {
  await createNewHero(heroRequest, pathName, false);
  callback();
}

export default function HeroCard(props: HeroCardProps) {
  const pathName: string = usePathname();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteDialogInput, setDeleteDialogInput] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleInitiateDelete: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setDeleteDialogOpen(true);
    setDeleteDialogInput("");
  };

  const handleCancelDelete: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setIsDeleting(true);
    deleteHeroAction(props.hero.userId, props.hero.id, pathName, () => {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    });
  };

  const [copyDialogOpen, setCopyDialogOpen] = useState<boolean>(false);
  const [copyHeroName, setCopyHeroName] = useState<string>("");
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const handleInitiateCopy: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setCopyDialogOpen(true);
    setCopyHeroName(name + " - Copy");
  };

  const handleCancelCopy: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setCopyDialogOpen(false);
  };

  const handleConfirmCopy: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setIsCopying(true);
    createNewHeroAction(
      {
        id: 0,
        userId: props.hero.userId,
        name: copyHeroName,
        image: props.hero.image,
        level: props.hero.level,
      },
      pathName,
      () => {
        setIsCopying(false);
        setCopyDialogOpen(false);
      }
    );
  };

  const name: string = props.hero.name ? props.hero.name : "Unnamed Hero";
  const image: string = props.hero.image
    ? props.hero.image
    : "/hero-placeholder.svg";

  return (
    <Card>
      <CardActionArea component={Link} href={`/heroes/${props.hero.id}/view`}>
        <CardMedia
          component="div"
          style={{ position: "relative", height: 140, width: "100%" }}
        >
          <Image src={image} alt={"Test"} fill objectFit="contain" />
        </CardMedia>
        <CardHeader
          titleTypographyProps={{ textTransform: "uppercase" }}
          title={name}
        ></CardHeader>
        <Divider variant="middle" />
        <CardContent>
          {/* <Field label="Ancestry" value={props.hero.ancestry} />
          <Field label="Career" value={props.hero.career} />
          <Field label="Class" value={props.hero.heroClass} />
          {props.hero.subclass && <Field {...props.hero.subclass} />} */}
          <Field
            label="Level"
            value={props.hero.level.toString()}
            defaultValue="-"
          />
          {/* <Field label="Kit" value={props.hero.kit.join(", ")} /> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Edit">
          <IconButton
            component={Link}
            href={`/heroes/${props.hero.id}/edit/think`}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Copy">
          <div>
            <IconButton onClick={handleInitiateCopy}>
              <CopyIcon />
            </IconButton>
            <Dialog open={copyDialogOpen}>
              <DialogTitle>Copy {name}?</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to copy this character?
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  disabled={isCopying}
                  value={copyHeroName}
                  onChange={(event) => setCopyHeroName(event.target.value)}
                  required
                  label="New Hero Name"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  autoFocus
                  disabled={isCopying}
                  onClick={handleCancelCopy}
                >
                  Cancel
                </Button>
                <Button
                  disabled={copyHeroName.trim() == "" || isCopying}
                  variant="contained"
                  onClick={handleConfirmCopy}
                >
                  {isCopying && (
                    <CircularProgress
                      size={24}
                      sx={{ position: "absolute", zIndex: 1 }}
                    />
                  )}
                  Copy
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Tooltip>
        <Tooltip title="Delete">
          <div>
            <IconButton onClick={handleInitiateDelete}>
              <DeleteIcon />
            </IconButton>
            <Dialog open={deleteDialogOpen}>
              <DialogTitle>Delete {name}?</DialogTitle>
              <DialogContent>
                <Alert severity="warning">
                  To delete this character, type the word DELETE into the field
                  below.
                </Alert>
                <TextField
                  margin="normal"
                  fullWidth
                  disabled={isDeleting}
                  value={deleteDialogInput}
                  required
                  onChange={(event) =>
                    setDeleteDialogInput(event.target.value.toUpperCase())
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  autoFocus
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  disabled={deleteDialogInput != "DELETE" || isDeleting}
                  variant="contained"
                  onClick={handleConfirmDelete}
                >
                  {isDeleting && (
                    <CircularProgress
                      size={24}
                      sx={{ position: "absolute", zIndex: 1 }}
                    />
                  )}
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
