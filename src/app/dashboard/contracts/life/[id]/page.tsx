"use client"

import { useEffect, useState } from "react"
import { useLife } from "@/hooks"
import { useSession } from "next-auth/react"

const Page = () => {
  const { life, getOneLifeContract } = useLife()
  const { data, status } = useSession()

  const id = window.location.pathname.split("/").pop()

  useEffect(() => {
    window.print()
  }, [])

  useEffect(() => {
    if ((data as any)?.token && id && status === "authenticated") {
      getOneLifeContract((data as any)?.token, id)
    }
  }, [id, getOneLifeContract])
  return (
    life && (
      <>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
          <header className="text-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold">Life Insurance Contract</h1>
            <p className="text-gray-600 mt-2">
              <strong>Contract ID:</strong> {id}
            </p>
            <p className="text-gray-600">
              <strong>Effective Date:</strong>{" "}
              {(life.effective_date && life?.effective_date.split("T")[0]) ??
                ""}
            </p>
            <p className="text-gray-600">
              <strong>Expiration Date:</strong>{" "}
              {life.effective_date && life?.expiration_date.split("T")[0]}
            </p>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Policy Overview
            </h2>
            <p className="mb-4">
              This contract is entered into by{" "}
              <strong>Tendanz Insurance Company</strong> (hereinafter referred
              to as "the Company") and{" "}
              <strong>
                {(data as any)?.user?.firstName +
                  " " +
                  (data as any)?.user?.lastName}
              </strong>{" "}
              (hereinafter referred to as "the Policyholder"). This policy
              provides coverage under the terms and conditions outlined in this
              document.
            </p>
            <p className="mb-4">
              The policyholder is entitled to a face amount of{" "}
              <strong>
                ${life.face_amount && life.face_amount.toLocaleString()}
              </strong>{" "}
              in coverage under a <strong>{life.policy_type}</strong> insurance
              plan. The premium is payable on a{" "}
              <strong>{life.premium_mode}</strong> basis, with an amount of{" "}
              <strong>
                ${life.premium_amount && life.premium_amount.toLocaleString()}
              </strong>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Beneficiaries
            </h2>
            <p className="mb-4">
              <strong>Primary Beneficiary:</strong> {life?.benificiary_name}
              <br />
              <strong>Relationship:</strong> {life?.benificiary_relationship}
            </p>
            <p>
              <strong>Contingent Beneficiary:</strong>{" "}
              {life?.contingent_benificiary_name}
              <br />
              <strong>Relationship:</strong>{" "}
              {life?.contingent_benificiary_relationship}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Policy Terms
            </h2>
            <p className="mb-4">
              This policy is valid for a term of{" "}
              <strong>{life.policy_term} years</strong>, commencing on the
              effective date specified above. The policyholder is obligated to
              make timely premium payments to maintain coverage. Failure to pay
              premiums within the grace period may result in policy
              cancellation.
            </p>
            <p className="mb-4">
              The policyholder agrees to notify the Company of any material
              changes to personal or beneficiary information. Any claim under
              this policy must be submitted in writing with all supporting
              documents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Status and Message
            </h2>
            <p className="mb-4">
              <strong>Status:</strong> Approved
            </p>
            <p>
              <strong>Message from the Company:</strong>
              We have approved your contract request. Thank you for choosing
              Tendanz Insurance. We are committed to securing your future and
              providing you with peace of mind.
            </p>
          </section>

          <footer className="text-center mt-10 border-t pt-6 text-gray-500 text-sm">
            <p>
              This contract is issued by Tendanz Insurance Company. For
              questions or concerns, please contact our support team at
              <a
                href="mailto:support@tendanz.com"
                className="text-blue-500 hover:underline"
              >
                support@tendanz.com
              </a>
              .
            </p>
          </footer>
        </div>
      </>
    )
  )
}

export default Page
