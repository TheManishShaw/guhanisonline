"use client";
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollAnimationWrapper from "../animation/ScrollAnimationWrapper";
import getScrollAnimation from "@/lib/getScrollAnimation";

const ContactPage = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <ScrollAnimationWrapper className=" ">
      <motion.div
        variants={scrollAnimation}
        className="container mx-auto my-12 px-4 md:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and well get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </CardContent>
          </Card>
          <div className=" w-full rounded-lg overflow-hidden shadow-lg">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10340954.352117049!2d79.5574000163763!3d23.954140380511532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1714211899057!5m2!1sen!2sin"
              width="600"
              height="480"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
            <Image
              width="600"
              height="420"
              className="max-h-[460px] rounded-lg w-full"
              src={"/assets/images/login/placeholder.svg"}
              alt="address"
            />
          </div>
        </div>
      </motion.div>
      <Dialog>
        <DialogTrigger className="hidden" />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Sent</DialogTitle>
            <DialogDescription>
              Thank you for contacting us. Well get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div>
              <Button>Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollAnimationWrapper>
  );
};

export default ContactPage;
