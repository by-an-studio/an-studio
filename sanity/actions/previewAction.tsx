import { useState } from "react";
import type { DocumentActionComponent, DocumentActionProps } from "sanity";
import { useClient } from "sanity";
import { EyeOpenIcon } from "@sanity/icons";
import { createPreviewSecret } from "@sanity/preview-url-secret/create-secret";
import { apiVersion } from "../env";
import { getPreviewPath, withLocale } from "./previewUrl";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.byanstudio.com";

function buildPreviewAction(locale: "en" | "es", label: string): DocumentActionComponent {
  const PreviewAction = (props: DocumentActionProps) => {
    const { draft, published, type } = props;
    const [loading, setLoading] = useState(false);
    const client = useClient({ apiVersion });

    const doc = (draft || published) as { _type: string; slug?: { current?: string } } | undefined;
    const path = doc ? getPreviewPath({ ...doc, _type: type }) : null;

    if (!path) return null;

    return {
      label,
      icon: EyeOpenIcon,
      disabled: loading,
      onHandle: async () => {
        setLoading(true);
        try {
          const studioUrl = `${window.location.origin}/studio`;
          const { secret } = await createPreviewSecret(client, "manual-preview", studioUrl);
          const redirectPath = withLocale(path, locale);
          const url = new URL("/api/draft-mode/enable", SITE_URL);
          url.searchParams.set("sanity-preview-secret", secret);
          url.searchParams.set("sanity-preview-pathname", redirectPath);
          window.open(url.toString(), "_blank", "noopener,noreferrer");
        } finally {
          setLoading(false);
          props.onComplete();
        }
      },
    };
  };
  return PreviewAction;
}

export const previewActionEn = buildPreviewAction("en", "Vista previa (EN)");
export const previewActionEs = buildPreviewAction("es", "Vista previa (ES)");
