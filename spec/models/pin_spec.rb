# -*- coding: utf-8 -*-
# == Schema Information
#
# Table name: pins
#
#  id         :integer          not null, primary key
#  member_id  :integer          default(0), not null
#  link       :string(255)      default(""), not null
#  title      :string(255)
#  created_on :datetime         not null
#  updated_on :datetime         not null
#

require 'spec_helper'

describe Pin do
  describe ".after_create" do
    it "destroy_over_limit_pins called" do
      pin = FactoryBot.build(:pin)
      expect(pin).to receive(:destroy_over_limit_pins)
      pin.save
    end
  end

  describe "#destroy_over_limit_pins" do
    before {
      allow(Settings).to receive(:save_pin_limit).and_return(1)
      @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
      @old_pin = FactoryBot.create(:pin, member: @member, link: "link_1")
    }
    context "not over limit" do
      it "nop" do
        @pin = FactoryBot.build(:pin, member: @member, link: "link_2")
        @pin.destroy_over_limit_pins
        expect { @old_pin.reload }.not_to raise_error # be_destroyed
      end
    end
    context "over limit" do
      it "older pin is destroyed" do
        @pin = FactoryBot.create(:pin, member: @member, link: "link_2") # run after_create
        expect { @old_pin.reload }.to raise_error ActiveRecord::RecordNotFound # be_destroyed
        expect { @pin.reload }.not_to raise_error # not be_destroyed
      end
    end
  end
end
