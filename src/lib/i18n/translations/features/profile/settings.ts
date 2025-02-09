export const settings = {
  en: {
    security: {
      title: "Security Settings",
      email: {
        title: "Email Settings",
        description: "Update your email address. A confirmation will be sent to the new address.",
        current: "Current email",
        newEmail: "New Email Address",
        newEmailPlaceholder: "Enter new email address",
        currentPassword: "Current Password",
        passwordPlaceholder: "Enter your current password",
        updateButton: "Update Email",
        synchronizing: "Synchronizing...",
        status: {
          pending: "Updating Email...",
          confirming: "Waiting for Confirmation...",
          updatingProfile: "Updating Profile..."
        },
        success: {
          title: "Success",
          message: "Email updated successfully",
          confirmationEmail: "Please check your new email for confirmation"
        },
        error: {
          title: "Error",
          message: "Failed to update email",
          invalidPassword: "Invalid password"
        }
      },
      password: {
        title: "Password Settings",
        description: "Update your password to keep your account secure.",
        current: "Current Password",
        new: "New Password",
        confirm: "Confirm New Password",
        updateButton: "Update Password",
        updating: "Updating Password...",
        success: {
          title: "Success",
          message: "Your password has been updated successfully."
        },
        error: {
          title: "Error",
          message: "Failed to update password. Please try again.",
          mismatch: "New passwords do not match"
        }
      }
    },
    avatar: {
      uploadInstructions: "Click or drag and drop an image to update your profile picture.",
      specifications: {
        title: "Image Specifications",
        format: "Format:",
        formatTypes: "JPEG or GIF",
        maxSize: "Max size:",
        maxSizeValue: "100KB",
        minDimensions: "Min dimensions:",
        minDimensionsValue: "200x200 pixels"
      },
      errors: {
        invalidType: {
          title: "Invalid File Type",
          message: "Please upload a JPEG or GIF file."
        },
        fileSize: {
          title: "File Too Large",
          message: "Image must be less than 100KB."
        },
        dimensions: {
          title: "Invalid Dimensions",
          message: "Image must be at least 200x200 pixels."
        },
        uploadError: {
          title: "Upload Failed",
          message: "Failed to upload image. Please try again."
        }
      },
      success: {
        title: "Upload Successful",
        message: "Your profile picture has been updated."
      }
    }
  },
  fr: {
    security: {
      title: "Paramètres de sécurité",
      email: {
        title: "Paramètres email",
        description: "Mettez à jour votre adresse email. Une confirmation sera envoyée à la nouvelle adresse.",
        current: "Email actuel",
        newEmail: "Nouvelle adresse email",
        newEmailPlaceholder: "Entrez la nouvelle adresse email",
        currentPassword: "Mot de passe actuel",
        passwordPlaceholder: "Entrez votre mot de passe actuel",
        updateButton: "Mettre à jour l'email",
        synchronizing: "Synchronisation...",
        status: {
          pending: "Mise à jour de l'email...",
          confirming: "En attente de confirmation...",
          updatingProfile: "Mise à jour du profil..."
        },
        success: {
          title: "Succès",
          message: "Email mis à jour avec succès",
          confirmationEmail: "Veuillez vérifier votre nouvel email pour la confirmation"
        },
        error: {
          title: "Erreur",
          message: "Échec de la mise à jour de l'email",
          invalidPassword: "Mot de passe invalide"
        }
      },
      password: {
        title: "Paramètres du mot de passe",
        description: "Mettez à jour votre mot de passe pour sécuriser votre compte.",
        currentPassword: "Mot de passe actuel",
        newPassword: "Nouveau mot de passe",
        confirmPassword: "Confirmer le nouveau mot de passe",
        updateButton: "Mettre à jour le mot de passe",
        updating: "Mise à jour du mot de passe...",
        success: {
          title: "Succès",
          message: "Votre mot de passe a été mis à jour avec succès."
        },
        error: {
          title: "Erreur",
          message: "Échec de la mise à jour du mot de passe. Veuillez réessayer."
        }
      }
    },
    avatar: {
      uploadInstructions: "Cliquez ou faites glisser une image pour mettre à jour votre photo de profil.",
      specifications: {
        title: "Spécifications de l'image",
        format: "Format :",
        formatTypes: "JPEG ou GIF",
        maxSize: "Taille max :",
        maxSizeValue: "100Ko",
        minDimensions: "Dimensions min :",
        minDimensionsValue: "200x200 pixels"
      },
      errors: {
        invalidType: {
          title: "Type de fichier invalide",
          message: "Veuillez télécharger un fichier JPEG ou GIF."
        },
        fileSize: {
          title: "Fichier trop volumineux",
          message: "L'image doit faire moins de 100Ko."
        },
        dimensions: {
          title: "Dimensions invalides",
          message: "L'image doit faire au moins 200x200 pixels."
        },
        uploadError: {
          title: "Échec du téléchargement",
          message: "Échec du téléchargement de l'image. Veuillez réessayer."
        },
        success: {
          title: "Téléchargement réussi",
          message: "Votre photo de profil a été mise à jour."
        }
      }
    }
  },
  es: {
    security: {
      title: "Configuración de seguridad",
      email: {
        title: "Configuración de email",
        description: "Actualiza tu dirección de email. Se enviará una confirmación a la nueva dirección.",
        current: "Email actual",
        newEmail: "Nueva dirección de email",
        newEmailPlaceholder: "Ingresa la nueva dirección de email",
        currentPassword: "Contraseña actual",
        passwordPlaceholder: "Ingresa tu contraseña actual",
        updateButton: "Actualizar email",
        synchronizing: "Sincronizando...",
        status: {
          pending: "Actualizando email...",
          confirming: "Esperando confirmación...",
          updatingProfile: "Actualizando perfil..."
        },
        success: {
          title: "Éxito",
          message: "Email actualizado con éxito",
          confirmationEmail: "Por favor, verifica tu nuevo email para la confirmación"
        },
        error: {
          title: "Error",
          message: "Error al actualizar el email",
          invalidPassword: "Contraseña inválida"
        }
      },
      password: {
        title: "Configuración de contraseña",
        description: "Actualiza tu contraseña para mantener tu cuenta segura.",
        currentPassword: "Contraseña actual",
        newPassword: "Nueva contraseña",
        confirmPassword: "Confirmar nueva contraseña",
        updateButton: "Actualizar contraseña",
        updating: "Actualizando contraseña...",
        success: {
          title: "Éxito",
          message: "Tu contraseña ha sido actualizada con éxito."
        },
        error: {
          title: "Error",
          message: "Error al actualizar la contraseña. Por favor, inténtalo de nuevo."
        }
      }
    },
    avatar: {
      uploadInstructions: "Haz clic o arrastra una imagen para actualizar tu foto de perfil.",
      specifications: {
        title: "Especificaciones de la imagen",
        format: "Formato:",
        formatTypes: "JPEG o GIF",
        maxSize: "Tamaño máximo:",
        maxSizeValue: "100KB",
        minDimensions: "Dimensiones mínimas:",
        minDimensionsValue: "200x200 píxeles"
      },
      errors: {
        invalidType: {
          title: "Tipo de archivo inválido",
          message: "Por favor, sube un archivo JPEG o GIF."
        },
        fileSize: {
          title: "Archivo demasiado grande",
          message: "La imagen debe ser menor de 100KB."
        },
        dimensions: {
          title: "Dimensiones inválidas",
          message: "La imagen debe ser de al menos 200x200 píxeles."
        },
        uploadError: {
          title: "Error al subir",
          message: "Error al subir la imagen. Por favor, inténtalo de nuevo."
        },
        success: {
          title: "Subida exitosa",
          message: "Tu foto de perfil ha sido actualizada."
        }
      }
    }
  }
};
