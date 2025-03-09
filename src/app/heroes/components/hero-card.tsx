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

import { MouseEventHandler, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import CopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from "next/link";

import Hero from "@/app/models/hero";

import Image from "next/image";
import { usePathname } from "next/navigation";
import createNewHero from "./create-new-hero";
import deleteHero from "./delete-hero";

import Field from "@/app/components/field";
import Ancestry from "@/app/models/ancestry";
import Career from "@/app/models/career";
import HeroClass from "@/app/models/hero-class";

interface HeroCardProps {
  hero: Hero;
  ancestries: Map<number, Ancestry>;
  careers: Map<number, Career>;
  heroClasses: Map<number, HeroClass>;
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

export default function HeroCard({
  hero,
  ancestries,
  careers,
  heroClasses,
}: HeroCardProps) {
  const pathName: string = usePathname();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteDialogInput, setDeleteDialogInput] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleInitiateDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setDeleteDialogOpen(true);
    setDeleteDialogInput("");
  };

  const handleCancelDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleting(true);
    deleteHeroAction(hero.userId, hero.id, pathName, () => {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    });
  };

  const [copyDialogOpen, setCopyDialogOpen] = useState<boolean>(false);
  const [copyHeroName, setCopyHeroName] = useState<string>("");
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const handleInitiateCopy: MouseEventHandler<HTMLButtonElement> = () => {
    setCopyDialogOpen(true);
    setCopyHeroName(name + " - Copy");
  };

  const handleCancelCopy: MouseEventHandler<HTMLButtonElement> = () => {
    setCopyDialogOpen(false);
  };

  const handleConfirmCopy: MouseEventHandler<HTMLButtonElement> = () => {
    setIsCopying(true);
    createNewHeroAction(
      {
        id: 0,
        userId: hero.userId,
        name: copyHeroName,
        ancestryId: hero.ancestryId,
        organizationId: hero.organizationId,
        environmentId: hero.environmentId,
        upbringingId: hero.upbringingId,
        careerId: hero.careerId,
        heroClassId: hero.heroClassId,
        image: hero.image,
        level: hero.level,
      },
      pathName,
      () => {
        setIsCopying(false);
        setCopyDialogOpen(false);
      }
    );
  };

  const name: string = hero.name ? hero.name : "Unnamed Hero";
  const image: string = hero.image ? hero.image : "/hero-placeholder.svg";

  return (
    <Card>
      <CardActionArea component={Link} href={`/heroes/${hero.id}/view`}>
        <CardMedia
          component="div"
          style={{ position: "relative", height: 140, width: "100%" }}
        >
          <Image
            src={image}
            alt={"Test"}
            fill
            style={{ objectFit: "contain" }}
          />
        </CardMedia>
        <CardHeader
          titleTypographyProps={{ textTransform: "uppercase" }}
          title={name}
        ></CardHeader>
        <Divider variant="middle" />
        <CardContent>
          <Field
            label="Ancestry"
            value={
              hero.ancestryId
                ? ancestries.get(hero.ancestryId)?.type
                : undefined
            }
          />
          <Field
            label="Career"
            value={hero.careerId ? careers.get(hero.careerId)?.name : undefined}
          />
          <Field
            label="Class"
            value={
              hero.heroClassId
                ? heroClasses.get(hero.heroClassId)?.name
                : undefined
            }
          />
          {/* {props.hero.subclass && <Field {...props.hero.subclass} />} */}
          <Field label="Level" value={hero.level.toString()} defaultValue="-" />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Edit">
          <IconButton component={Link} href={`/heroes/${hero.id}/edit/`}>
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
