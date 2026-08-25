'use client'

import styles from '@/css/viewbuttoninvitation.module.css'

interface ViewInvitationButtonProps {
  token: string
}

export default function ViewInvitationButton({
  token,
}: ViewInvitationButtonProps) {
  function handleViewInvitation() {
    window.open(
      `/i/${token}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleViewInvitation}
    >
      Ver invitación
    </button>
  )
}